import { FastifyInstance } from 'fastify';

export async function ativoRoutesTest(fastify: FastifyInstance) {
  fastify.get('/ativos', async (request, reply) => {
    return { message: 'Ativos endpoint working' };
  });
}

export default ativoRoutesTest;
