import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const [funcName, name, method, routePath] = process.argv.slice(2);

if (!funcName || !name || !method || !routePath) {
  console.error(
    'Usage: pnpm generate:service <functionName> <Name> <method> <path>\n' +
      'Example: pnpm generate:service findUserProfileById GetUserProfile get app/users/_userId/profile'
  );
  process.exit(1);
}

const validMethods = ['get', 'post', 'put', 'patch', 'delete'];
if (!validMethods.includes(method)) {
  console.error(`Error: method must be one of ${validMethods.join(', ')}`);
  process.exit(1);
}

const dir = resolve(__dirname, '..', 'src', 'routes', routePath, `_${method}`);
const filePath = join(dir, `${funcName}.ts`);

if (existsSync(filePath)) {
  console.error(`Error: ${filePath} already exists`);
  process.exit(1);
}

mkdirSync(dir, { recursive: true });

const content = `import type { ${name}Response } from './schema';
import type { Prisma } from '@/lib';
import type { Result } from '@/types';
import { logger } from '@/utils';

/**
 * TODO: 関数の説明
 */
export const ${funcName} = async ({
  prisma
}: {
  prisma: Prisma;
}): Promise<Result<${name}Response[200], { errorCode: 630 }>> => {
  try {
    // TODO: ビジネスロジックを実装

    return {
      success: true,
      data: {
        // TODO
      }
    };
  } catch (error) {
    /* eslint-disable-next-line functional/no-expression-statements */
    logger.error(error);

    return { success: false, error: { errorCode: 630 } };
  }
};
`;

writeFileSync(filePath, content);
console.log(`Created: ${filePath}`);
