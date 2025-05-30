import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { clienteRoutes } from './routes/cliente.routes';
import { ativoRoutes } from './routes/ativo.routes';

// Carrega variáveis de ambiente
dotenv.config();

// Inicializa o Prisma Client
const prisma = new PrismaClient();

// Cria a instância do Fastify
const fastify = Fastify({
  logger: true
});

// Registra o plugin CORS
fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://frontend:3000'],
  credentials: true
});

// Adiciona o Prisma ao contexto do Fastify
fastify.decorate('prisma', prisma);

// Declara o tipo para TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

// Rota de health check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString(), database: 'connected' };
});

// Rota raiz
fastify.get('/', async (request, reply) => {
  return { 
    message: 'API Investimentos - Sistema de Gestão de Clientes e Ativos',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      clientes: '/api/clientes',
      ativos: '/api/ativos'
    }
  };
});

// Registrar rotas
fastify.register(clienteRoutes, { prefix: '/api' });
fastify.register(ativoRoutes, { prefix: '/api' });

// Função para iniciar o servidor
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001');
    const host = '0.0.0.0'; // Importante para Docker
    
    await fastify.listen({ port, host });
    
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`📊 Dashboard Prisma: npx prisma studio`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Encerrando servidor...');
  await prisma.$disconnect();
  await fastify.close();
  process.exit(0);
});

// Inicia o servidor
start();
