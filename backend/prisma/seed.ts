import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criando ativos financeiros fixos
  const ativos = [
    { nome: 'Vale S.A.', codigo: 'VALE3', tipo: 'Ação', descricao: 'Mineração e siderurgia' },
    { nome: 'Petrobras', codigo: 'PETR4', tipo: 'Ação', descricao: 'Petróleo e gás natural' },
    { nome: 'Itaú Unibanco', codigo: 'ITUB4', tipo: 'Ação', descricao: 'Serviços financeiros' },
    { nome: 'Bradesco', codigo: 'BBDC4', tipo: 'Ação', descricao: 'Banco múltiplo' },
    { nome: 'Fundo ABC Multimercado', codigo: 'ABC001', tipo: 'Fundo', descricao: 'Fundo multimercado com estratégia diversificada' },
    { nome: 'Fundo XYZ Renda Fixa', codigo: 'XYZ002', tipo: 'Fundo', descricao: 'Fundo de renda fixa conservador' },
    { nome: 'CDB Banco Premium', codigo: 'CDB001', tipo: 'CDB', descricao: 'Certificado de Depósito Bancário prefixado' },
    { nome: 'LCI Banco Inter', codigo: 'LCI001', tipo: 'LCI', descricao: 'Letra de Crédito Imobiliário isenta de IR' },
    { nome: 'Tesouro IPCA+ 2029', codigo: 'IPCA29', tipo: 'Tesouro', descricao: 'Título público indexado à inflação' },
    { nome: 'Tesouro Selic 2026', codigo: 'SELIC26', tipo: 'Tesouro', descricao: 'Título público pós-fixado Selic' }
  ];

  console.log('📊 Criando ativos financeiros...');
  
  for (const ativo of ativos) {
    // Verifica se o ativo já existe
    const ativoExistente = await prisma.ativo.findFirst({
      where: { codigo: ativo.codigo }
    });

    if (ativoExistente) {
      // Atualiza o ativo se já existe
      await prisma.ativo.update({
        where: { id: ativoExistente.id },
        data: { 
          nome: ativo.nome,
          tipo: ativo.tipo,
          descricao: ativo.descricao
        }
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
