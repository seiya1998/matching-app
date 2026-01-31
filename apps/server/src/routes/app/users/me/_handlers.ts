import type { FastifyInstance } from 'fastify';
import { pipe } from 'ramda';
import { match } from 'ts-pattern';
import { getCurrentUserFromDB } from './_get/getCurrentUserFromDB';
import {
  GetCurrentUserRequest,
  GetCurrentUserResponse,
  schemas
} from './_get/schema';
import { bypass, start, dbMiddleware } from '@/utils';

export default async function (fastify: FastifyInstance) {
  /*
   * GET /app/users/:userId
   */
  /* eslint-disable-next-line functional/no-expression-statements */
  fastify.get<{
    Headers: GetCurrentUserRequest['Headers'];
    Reply: GetCurrentUserResponse;
  }>(
    '/',
    {
      schema: schemas['get']
    },
    async (_request, reply) => {
      const getCurrentUser = dbMiddleware(getCurrentUserFromDB);
      return pipe(
        start({ success: true, data: {} } as const),
        bypass(getCurrentUser),
        async (result) =>
          match(await result)
            .with({ success: true }, ({ data }) => {
              return reply.code(200).send(data);
            })
            .otherwise(() => {
              return reply.code(500).send({ error: 'Internal Server Error' });
            })
      )();
    }
  );
}
