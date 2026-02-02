import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const [name, method, routePath] = process.argv.slice(2);

if (!name || !method || !routePath) {
  console.error(
    'Usage: pnpm generate:extract-params <Name> <method> <path>\n' +
      'Example: pnpm generate:extract-params GetUserProfile get app/users/_userId/profile'
  );
  process.exit(1);
}

const validMethods = ['get', 'post', 'put', 'patch', 'delete'];
if (!validMethods.includes(method)) {
  console.error(`Error: method must be one of ${validMethods.join(', ')}`);
  process.exit(1);
}

const funcName = `extractParamsFor${name}`;
const dir = resolve(__dirname, '..', 'src', 'routes', routePath, `_${method}`);
const filePath = join(dir, `${funcName}.ts`);

if (existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const content = `import { FastifyRequest } from 'fastify';
import { ${name}Request } from './schema';
import { Result } from '@/types';
import { validateParams } from '@/utils';

export const ${funcName} = (
  request: FastifyRequest<${name}Request>
): Result<{ /* TODO */ }, { errorCode: 400 }> => {
  return validateParams<{ /* TODO */ }>(request.params, {
    // TODO: バリデーションルールを定義
  });
};
`;

writeFileSync(filePath, content);
console.log(`Created: ${filePath}`);
