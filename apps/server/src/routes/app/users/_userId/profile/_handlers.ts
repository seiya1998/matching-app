import type { FastifyInstance } from 'fastify';
import { pipe } from 'ramda';
import { match } from 'ts-pattern';
import { extractParamsForGetUserProfile } from './_get/extractParamsForGetUserProfile';
import { findUserProfileById } from './_get/findUserProfileById';
import {
  GetUserProfileRequest,
  GetUserProfileResponse,
  schemas
} from './_get/schema';
import { bypass, start, dbMiddleware } from '@/utils';

export default async function (fastify: FastifyInstance) {
  /*
   * GET /users/:userId/profile
   */
  /* eslint-disable-next-line functional/no-expression-statements */
  fastify.get<{
    Headers: GetUserProfileRequest['Headers'];
    Params: GetUserProfileRequest['Params'];
    Reply: GetUserProfileResponse;
  }>(
    '/',
    {
      schema: schemas['get']
    },
    async (request, reply) => {
      const getUserProfile = dbMiddleware(findUserProfileById);
      return pipe(
        start(extractParamsForGetUserProfile(request)),
        bypass(getUserProfile),
        async (result) =>
          match(await result)
            .with({ error: { errorCode: 400 } }, () => {
              return reply.code(400).send({ error: 'リクエストが不正です' });
            })
            .with({ error: { errorCode: 600 } }, () => {
              return reply
                .code(404)
                .send({ error: 'ユーザーが見つかりません' });
            })
            .with({ error: { errorCode: 610 } }, () => {
              return reply.code(409).send({ error: '既に退会済みです' });
            })
            .with({ error: { errorCode: 630 } }, () => {
              return reply.code(500).send({ error: 'Internal Server Error' });
            })
            .with({ success: true }, ({ data }) => {
              return reply.code(200).send(data);
            })
            .exhaustive()
      )();
    }
  );
}
