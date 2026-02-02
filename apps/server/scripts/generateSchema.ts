import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const [name, method, routePath] = process.argv.slice(2);

if (!name || !method || !routePath) {
  console.error(
    'Usage: pnpm generate:schema <Name> <method> <path>\n' +
      'Example: pnpm generate:schema GetUserProfile get app/users/_userId/profile'
  );
  process.exit(1);
}

const validMethods = ['get', 'post', 'put', 'patch', 'delete'];
if (!validMethods.includes(method)) {
  console.error(`Error: method must be one of ${validMethods.join(', ')}`);
  process.exit(1);
}

// URLパスを導出（app/ を除去、_param → :param）
const urlPath =
  '/' +
  routePath
    .replace(/^app\//, '')
    .split('/')
    .map((seg) => (seg.startsWith('_') ? `:${seg.slice(1)}` : seg))
    .join('/');

const dir = resolve(__dirname, '..', 'src', 'routes', routePath, `_${method}`);
const filePath = join(dir, 'schema.ts');

if (existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const content = `import { JSONSchema } from 'json-schema-to-ts';
import { GenerateRequestTypes, GenerateResponseTypes } from '@/types';

/**
 * ${method.toUpperCase()}: ${urlPath}
 */
export const schemas = {
  ${method}: {
    tags: ['TODO'],
    description: 'TODO',
    headers: {
      type: 'object',
      properties: {
        authorization: { type: 'string' }
      }
    } as const satisfies JSONSchema,
    response: {
      200: {
        type: 'object',
        properties: {
          // TODO
        },
        required: []
      } as const satisfies JSONSchema,
      500: {
        description: 'サーバーエラー',
        type: 'object',
        properties: {
          error: { type: 'string', enum: ['Internal Server Error'] }
        },
        required: ['error']
      } as const satisfies JSONSchema
    }
  }
};

export type ${name}Request = GenerateRequestTypes<typeof schemas.${method}>;

export type ${name}Response = GenerateResponseTypes<
  typeof schemas.${method}.response
>;
`;

writeFileSync(filePath, content);
console.log(`Created: ${filePath}`);
