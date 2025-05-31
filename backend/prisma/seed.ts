import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpando dados existentes (opcional - apenas para desenvolvimento)
  console.log('🧹 Limpando dados existentes...');
  await prisma.alocacaoAtivo.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.ativo.deleteMany();

  // Criando ativos financeiros
  const ativos = [
    { nome: 'Vale S.A.', codigo: 'VALE3', tipo: 'Ação', descricao: 'Mineração e siderurgia' },
    { nome: 'Petrobras', codigo: 'PETR4', tipo: 'Ação', descricao: 'Petróleo e gás natural' },
    { nome: 'Itaú Unibanco', codigo: 'ITUB4', tipo: 'Ação', descricao: 'Serviços financeiros' },
    { nome: 'Bradesco', codigo: 'BBDC4', tipo: 'Ação', descricao: 'Banco múltiplo' },
    { nome: 'Magazine Luiza', codigo: 'MGLU3', tipo: 'Ação', descricao: 'Varejo e e-commerce' },
    { nome: 'FII Bresco Logística', codigo: 'BRCO11', tipo: 'FII', descricao: 'Fundo de Investimento Imobiliário - Logística' },
    { nome: 'FII Shopping Parque Dom Pedro', codigo: 'PQDP11', tipo: 'FII', descricao: 'Fundo de Investimento Imobiliário - Shopping' },
    { nome: 'Fundo ABC Multimercado', codigo: 'ABC001', tipo: 'Fundo', descricao: 'Fundo multimercado com estratégia diversificada' },
    { nome: 'Fundo XYZ Renda Fixa', codigo: 'XYZ002', tipo: 'Fundo', descricao: 'Fundo de renda fixa conservador' },
    { nome: 'CDB Banco Premium', codigo: 'CDB001', tipo: 'CDB', descricao: 'Certificado de Depósito Bancário prefixado' },
    { nome: 'LCI Banco Inter', codigo: 'LCI001', tipo: 'LCI', descricao: 'Letra de Crédito Imobiliário isenta de IR' },
    { nome: 'Tesouro IPCA+ 2029', codigo: 'IPCA29', tipo: 'Tesouro', descricao: 'Título público indexado à inflação' },
    { nome: 'Tesouro Selic 2026', codigo: 'SELIC26', tipo: 'Tesouro', descricao: 'Título público pós-fixado Selic' },
    { nome: 'LCA Banco Santander', codigo: 'LCA001', tipo: 'LCA', descricao: 'Letra de Crédito do Agronegócio' },
    { nome: 'Debênture Infraestrutura', codigo: 'DEB001', tipo: 'Debênture', descricao: 'Debênture de infraestrutura incentivada' }
  ];

  console.log('📊 Criando ativos financeiros...');
  const ativosCreated = [];
  for (const ativo of ativos) {
    const ativoCreated = await prisma.ativo.create({
      data: ativo
    });
    ativosCreated.push(ativoCreated);
  }

  // Criando clientes
  const clientes = [
    { 
      nome: 'João da Silva Santos', 
      email: 'joao.santos@email.com', 
      status: Status.ATIVO 
    },
    { 
      nome: 'Maria Oliveira Costa', 
      email: 'maria.costa@email.com', 
      status: Status.ATIVO 
    },
    { 
      nome: 'Carlos Eduardo Lima', 
      email: 'carlos.lima@email.com', 
      status: Status.ATIVO 
    },
    { 
      nome: 'Ana Paula Ferreira', 
      email: 'ana.ferreira@email.com', 
      status: Status.ATIVO 
    },
    { 
      nome: 'Roberto Souza Pereira', 
      email: 'roberto.pereira@email.com', 
      status: Status.INATIVO 
    },
    { 
      nome: 'Fernanda Alves Rodrigues', 
      email: 'fernanda.rodrigues@email.com', 
      status: Status.ATIVO 
    },
    { 
      nome: 'Paulo Henrique Martins', 
      email: 'paulo.martins@email.com', 
      status: Status.ATIVO 
    },
    { 
      nome: 'Juliana Barbosa Silva', 
      email: 'juliana.silva@email.com', 
      status: Status.INATIVO 
    }
  ];

  console.log('👥 Criando clientes...');
  const clientesCreated = [];
  for (const cliente of clientes) {
    const clienteCreated = await prisma.cliente.create({
      data: cliente
    });
    clientesCreated.push(clienteCreated);
  }

  // Criando alocações de exemplo
  console.log('🔗 Criando alocações de ativos...');
  const alocacoes = [
    // João da Silva Santos - Carteira conservadora
    { clienteId: clientesCreated[0].id, ativoId: ativosCreated[11].id, valor: 50000 }, // Tesouro IPCA+
    { clienteId: clientesCreated[0].id, ativoId: ativosCreated[12].id, valor: 30000 }, // Tesouro Selic
    { clienteId: clientesCreated[0].id, ativoId: ativosCreated[9].id, valor: 20000 },  // CDB

    // Maria Oliveira Costa - Carteira moderada
    { clienteId: clientesCreated[1].id, ativoId: ativosCreated[2].id, valor: 25000 },  // Itaú
    { clienteId: clientesCreated[1].id, ativoId: ativosCreated[3].id, valor: 25000 },  // Bradesco
    { clienteId: clientesCreated[1].id, ativoId: ativosCreated[8].id, valor: 30000 },  // Fundo Renda Fixa
    { clienteId: clientesCreated[1].id, ativoId: ativosCreated[5].id, valor: 15000 },  // FII Logística

    // Carlos Eduardo Lima - Carteira agressiva
    { clienteId: clientesCreated[2].id, ativoId: ativosCreated[0].id, valor: 40000 },  // Vale
    { clienteId: clientesCreated[2].id, ativoId: ativosCreated[1].id, valor: 35000 },  // Petrobras
    { clienteId: clientesCreated[2].id, ativoId: ativosCreated[4].id, valor: 25000 },  // Magazine Luiza
    { clienteId: clientesCreated[2].id, ativoId: ativosCreated[7].id, valor: 20000 },  // Fundo Multimercado

    // Ana Paula Ferreira - Carteira FIIs + Renda Fixa
    { clienteId: clientesCreated[3].id, ativoId: ativosCreated[5].id, valor: 35000 },  // FII Logística
    { clienteId: clientesCreated[3].id, ativoId: ativosCreated[6].id, valor: 30000 },  // FII Shopping
    { clienteId: clientesCreated[3].id, ativoId: ativosCreated[10].id, valor: 25000 }, // LCI
    { clienteId: clientesCreated[3].id, ativoId: ativosCreated[13].id, valor: 15000 }, // LCA

    // Fernanda Alves Rodrigues - Carteira diversificada
    { clienteId: clientesCreated[5].id, ativoId: ativosCreated[2].id, valor: 30000 },  // Itaú
    { clienteId: clientesCreated[5].id, ativoId: ativosCreated[11].id, valor: 25000 }, // Tesouro IPCA+
    { clienteId: clientesCreated[5].id, ativoId: ativosCreated[5].id, valor: 20000 },  // FII Logística
    { clienteId: clientesCreated[5].id, ativoId: ativosCreated[14].id, valor: 15000 }, // Debênture

    // Paulo Henrique Martins - Carteira ações + fundos
    { clienteId: clientesCreated[6].id, ativoId: ativosCreated[0].id, valor: 35000 },  // Vale
    { clienteId: clientesCreated[6].id, ativoId: ativosCreated[3].id, valor: 30000 },  // Bradesco
    { clienteId: clientesCreated[6].id, ativoId: ativosCreated[7].id, valor: 25000 },  // Fundo Multimercado
  ];

  for (const alocacao of alocacoes) {
    await prisma.alocacaoAtivo.create({
      data: alocacao
    });
  }

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📈 ${ativos.length} ativos criados`);
  console.log(`👥 ${clientes.length} clientes criados`);
  console.log(`🔗 ${alocacoes.length} alocações criadas`);
  console.log('💰 Patrimônio total alocado: R$ ' + alocacoes.reduce((sum, a) => sum + a.valor, 0).toLocaleString('pt-BR'));
}

seed()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
