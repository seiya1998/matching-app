/* eslint-disable functional/no-return-void, functional/no-expression-statements, functional/no-conditional-statements */
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';
import fastifyAutoLoad from '@/utils/railway/fastifyAutoLoad';

const PORT = 8080;
const HOST = '0.0.0.0';

const server = fastify();

const init = async ({ host, port }: { host: string; port: number }) => {
  await server.register(fastifyAutoLoad);
  await server.register(helmet, {
    global: true,
    noSniff: true // X-Content-Type-Options: nosniff を有効にする
  });

  if (['local'].includes(process.env['NODE_ENV'] ?? '')) {
    await server.register(cors, {
      // 特定のオリジンからのリクエストのみを許可
      origin: ['http://localhost:5173'],
      credentials: true
    });
  }

  await server.ready();

  server.listen({ host, port }, (err: Error | null, address: string) => {
    if (err != null) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

void init({ host: HOST, port: PORT });
