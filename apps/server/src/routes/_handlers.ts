import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default function (fastify: FastifyInstance) {
  return fastify.get(
    '/',
    {},
    async (_: FastifyRequest, reply: FastifyReply) => {
      /* eslint-disable-next-line functional/no-expression-statements */
      console.log('HealthCheck OK!');
      return reply.code(200).send({ message: 'HealthCheck OK!' });
    }
  );
}
