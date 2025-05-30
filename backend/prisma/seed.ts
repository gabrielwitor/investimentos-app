import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criando ativos financeiros fixos
  const ativos = [
    { nome: 'Ação VALE3', valor: 85.50 },
    { nome: 'Ação PETR4', valor: 32.75 },
    { nome: 'Ação ITUB4', valor: 28.90 },
    { nome: 'Ação BBDC4', valor: 15.45 },
    { nome: 'Fundo ABC', valor: 150.25 },
    { nome: 'Fundo XYZ', valor: 95.80 },
    { nome: 'CDB Premium', valor: 1000.00 },
    { nome: 'LCI Banco Inter', valor: 500.00 },
    { nome: 'Tesouro IPCA+', valor: 2547.33 },
    { nome: 'Tesouro Selic', valor: 10234.56 }
  ];

  console.log('📊 Criando ativos financeiros...');
  
  for (const ativo of ativos) {
    // Verifica se o ativo já existe
    const ativoExistente = await prisma.ativo.findFirst({
      where: { nome: ativo.nome }
    });

    if (ativoExistente) {
      // Atualiza o valor se já existe
      await prisma.ativo.update({
        where: { id: ativoExistente.id },
        data: { valor: ativo.valor }
      });
    } else {
      // Cria novo ativo se não existe
      await prisma.ativo.create({
        data: ativo
      });
    }
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📈 ${ativos.length} ativos criados/atualizados`);
}

seed()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
