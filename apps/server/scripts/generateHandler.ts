import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const args = process.argv.slice(2);
const skipExtractParams = args.includes('--skip-extract-params');
const positionalArgs = args.filter((a) => !a.startsWith('--'));
const [name, method, routePath] = positionalArgs;

if (!name || !method || !routePath) {
  console.error(
    'Usage: pnpm generate:handler <Name> <method> <path> [--skip-extract-params]\n' +
      'Example: pnpm generate:handler GetUserProfile get app/users/_userId/profile'
  );
  process.exit(1);
}

const validMethods = ['get', 'post', 'put', 'patch', 'delete'];
if (!validMethods.includes(method)) {
  console.error(`Error: method must be one of ${validMethods.join(', ')}`);
  process.exit(1);
}

const dir = resolve(__dirname, '..', 'src', 'routes', routePath);
const filePath = join(dir, '_handlers.ts');

if (existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const funcName = `extractParamsFor${name}`;

let content: string;

if (skipExtractParams) {
  content = `import type { FastifyInstance } from 'fastify';
import { pipe } from 'ramda';
import { match } from 'ts-pattern';
import {
  ${name}Request,
  ${name}Response,
  schemas
} from './_${method}/schema';
import { start } from '@/utils';

export default async function (fastify: FastifyInstance) {
  fastify.${method}<{
    Headers: ${name}Request['Headers'];
    Reply: ${name}Response;
  }>(
    '/',
    { schema: schemas['${method}'] },
    async (_request, reply) => {
      return pipe(
        start({ success: true, data: {} } as const),
        async (result) =>
          match(await result)
            .with({ success: true }, ({ data }) =>
              reply.code(200).send(data)
            )
            .otherwise(() =>
              reply.code(500).send({ error: 'Internal Server Error' })
            )
      )();
    }
  );
}
`;
} else {
  content = `import type { FastifyInstance } from 'fastify';
import { pipe } from 'ramda';
import { match } from 'ts-pattern';
import { ${funcName} } from './_${method}/${funcName}';
import {
  ${name}Request,
  ${name}Response,
  schemas
} from './_${method}/schema';
import { bypass, start, dbMiddleware } from '@/utils';

export default async function (fastify: FastifyInstance) {
  fastify.${method}<{
    Headers: ${name}Request['Headers'];
    Params: ${name}Request['Params'];
    Reply: ${name}Response;
  }>(
    '/',
    { schema: schemas['${method}'] },
    async (request, reply) => {
      return pipe(
        start(${funcName}(request)),
        // bypass(dbMiddleware(/* TODO */)),
        async (result) =>
          match(await result)
            .with({ error: { errorCode: 400 } }, () =>
              reply.code(400).send({ error: 'リクエストが不正です' })
            )
            .with({ success: true }, ({ data }) =>
              reply.code(200).send(data)
            )
            .exhaustive()
      )();
    }
  );
}
`;
}

writeFileSync(filePath, content);
console.log(`Created: ${filePath}`);
