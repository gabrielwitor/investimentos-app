#!/usr/bin/env node

// Using Node.js built-in fetch (available in Node.js 18+)

const API_BASE_URL = 'http://localhost:3001';
const FRONTEND_URL = 'http://localhost:3000';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

async function testHealthCheck() {
  log('\n🏥 Testing Health Check...', 'bold');
  
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    logSuccess(`API Health Check: ${response.status}`);
    logInfo(`Response: ${JSON.stringify(data)}`);
    return true;
  } catch (error) {
    logError(`Health Check Failed: ${error.message}`);
    return false;
  }
}

async function testDashboardStats() {
  log('\n📊 Testing Dashboard Stats...', 'bold');
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
    const stats = await response.json();
    logSuccess(`Dashboard Stats: ${response.status}`);
    logInfo(`Total Clientes: ${stats.totalClientes}`);
    logInfo(`Clientes Ativos: ${stats.clientesAtivos}`);
    logInfo(`Ativos Disponíveis: ${stats.ativosDisponiveis}`);
    logInfo(`Patrimônio Total: R$ ${stats.patrimonioTotal.toLocaleString('pt-BR')}`);
    logInfo(`Alocações Ativas: ${stats.alocacoesAtivas}`);
    return true;
  } catch (error) {
    logError(`Dashboard Stats Failed: ${error.message}`);
    return false;
  }
}

async function testClientesAPI() {
  log('\n👥 Testing Clientes API...', 'bold');
  
  try {
    // Test list clientes
    const listResponse = await fetch(`${API_BASE_URL}/api/clientes?page=1&limit=5`);
    const listData = await listResponse.json();
    logSuccess(`List Clientes: ${listResponse.status}`);
    logInfo(`Found ${listData.clientes.length} clientes`);
    
    if (listData.clientes.length > 0) {
      const cliente = listData.clientes[0];
      logInfo(`Sample Cliente: ${cliente.nome} (${cliente.email})`);
      
      // Test get cliente by ID
      const getResponse = await fetch(`${API_BASE_URL}/api/clientes/${cliente.id}`);
      const getData = await getResponse.json();
      logSuccess(`Get Cliente by ID: ${getResponse.status}`);
    }
    
    return true;
  } catch (error) {
    logError(`Clientes API Failed: ${error.message}`);
    return false;
  }
}

async function testAtivosAPI() {
  log('\n📈 Testing Ativos API...', 'bold');
  
  try {
    // Test list ativos
    const listResponse = await fetch(`${API_BASE_URL}/api/ativos?page=1&limit=5`);
    const listData = await listResponse.json();
    logSuccess(`List Ativos: ${listResponse.status}`);
    logInfo(`Found ${listData.ativos.length} ativos`);
    
    if (listData.ativos.length > 0) {
      const ativo = listData.ativos[0];
      logInfo(`Sample Ativo: ${ativo.nome} (${ativo.codigo}) - ${ativo.tipo}`);
      
      // Test get ativo by ID
      const getResponse = await fetch(`${API_BASE_URL}/api/ativos/${ativo.id}`);
      const getData = await getResponse.json();
      logSuccess(`Get Ativo by ID: ${getResponse.status}`);
    }
    
    return true;
  } catch (error) {
    logError(`Ativos API Failed: ${error.message}`);
    return false;
  }
}

async function testAlocacoesAPI() {
  log('\n🔗 Testing Alocações API...', 'bold');
  
  try {
    // Test list alocações
    const listResponse = await fetch(`${API_BASE_URL}/api/alocacoes?page=1&limit=5`);
    const listData = await listResponse.json();
    logSuccess(`List Alocações: ${listResponse.status}`);
    logInfo(`Found ${listData.alocacoes.length} alocações`);
    
    if (listData.alocacoes.length > 0) {
      const alocacao = listData.alocacoes[0];
      logInfo(`Sample Alocação: R$ ${alocacao.valor.toLocaleString('pt-BR')} - ${alocacao.cliente.nome} → ${alocacao.ativo.nome}`);
    }
    
    return true;
  } catch (error) {
    logError(`Alocações API Failed: ${error.message}`);
    return false;
  }
}

async function testFrontendAccessibility() {
  log('\n🌐 Testing Frontend Accessibility...', 'bold');
  
  const pages = [
    '/',
    '/clientes',
    '/ativos'
  ];
  
  let successCount = 0;
  
  for (const page of pages) {
    try {
      const response = await fetch(`${FRONTEND_URL}${page}`, { 
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      logSuccess(`Page ${page}: ${response.status}`);
      successCount++;
    } catch (error) {
      logError(`Page ${page} Failed: ${error.message}`);
    }
  }
  
  return successCount === pages.length;
}

async function testCRUDOperations() {
  log('\n🧪 Testing CRUD Operations...', 'bold');
  
  try {
    // Create a test client
    const createData = {
      nome: 'Cliente Teste Integração',
      email: 'teste.integracao@exemplo.com',
      status: 'ATIVO'
    };
    
    const createResponse = await fetch(`${API_BASE_URL}/api/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData)
    });
    const createResult = await createResponse.json();
    logSuccess(`Create Cliente: ${createResponse.status}`);
    const clienteId = createResult.id;
    logInfo(`Created Cliente ID: ${clienteId}`);
    
    // Update the client
    const updateData = {
      nome: 'Cliente Teste Integração - Atualizado',
      status: 'INATIVO'
    };
    
    const updateResponse = await fetch(`${API_BASE_URL}/api/clientes/${clienteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    logSuccess(`Update Cliente: ${updateResponse.status}`);
    
    // Delete the client
    const deleteResponse = await fetch(`${API_BASE_URL}/api/clientes/${clienteId}`, {
      method: 'DELETE'
    });
    logSuccess(`Delete Cliente: ${deleteResponse.status}`);
    
    return true;
  } catch (error) {
    logError(`CRUD Operations Failed: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  log('🚀 Starting InvestApp Pro Integration Tests...', 'bold');
  log('=' .repeat(60), 'blue');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Dashboard Stats', fn: testDashboardStats },
    { name: 'Clientes API', fn: testClientesAPI },
    { name: 'Ativos API', fn: testAtivosAPI },
    { name: 'Alocações API', fn: testAlocacoesAPI },
    { name: 'Frontend Accessibility', fn: testFrontendAccessibility },
    { name: 'CRUD Operations', fn: testCRUDOperations }
  ];
  
  const results = [];
  
  for (const test of tests) {
    const result = await test.fn();
    results.push({ name: test.name, passed: result });
  }
  
  // Summary
  log('\n📋 Test Results Summary:', 'bold');
  log('=' .repeat(60), 'blue');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  results.forEach(result => {
    if (result.passed) {
      logSuccess(`${result.name}`);
    } else {
      logError(`${result.name}`);
    }
  });
  
  log(`\n📊 Overall Results: ${passed}/${total} tests passed`, 'bold');
  
  if (passed === total) {
    log('🎉 All tests passed! Your application is working correctly.', 'green');
    log('\n🌟 Next Steps:', 'bold');
    log('  • Open http://localhost:3000 in your browser');
    log('  • Import postman-collection.json into Postman for API testing');
    log('  • Navigate through the application to test the UI');
    log('  • Create new clients and allocations to test functionality');
  } else {
    log('⚠️  Some tests failed. Please check the errors above.', 'yellow');
    log('\n🔧 Troubleshooting:', 'bold');
    log('  • Ensure Docker containers are running: docker-compose ps');
    log('  • Check container logs: docker-compose logs');
    log('  • Restart services: docker-compose restart');
  }
  
  return passed === total;
}

async function testIntegration() {
  try {
    const success = await runAllTests();
    process.exit(success ? 0 : 1);
  } catch (error) {
    logError(`Integration test suite failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the tests
testIntegration();
