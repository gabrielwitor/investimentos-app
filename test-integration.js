#!/usr/bin/env node

const axios = require('axios');

async function testIntegration() {
  console.log('🔄 Testing Backend-Frontend Integration...\n');
  
  try {
    // Test backend API
    console.log('1. Testing Backend API (port 3001)...');
    const backendResponse = await axios.get('http://localhost:3001/api/ativos');
    console.log(`   ✅ Backend API Status: ${backendResponse.status}`);
    console.log(`   ✅ Data Count: ${backendResponse.data.ativos.length} ativos`);
    console.log(`   ✅ Sample Ativo: ${backendResponse.data.ativos[0]?.nome} (${backendResponse.data.ativos[0]?.codigo})`);
    
    // Test frontend accessibility
    console.log('\n2. Testing Frontend Accessibility...');
    
    // Test port 3000
    try {
      const frontendResponse3000 = await axios.get('http://localhost:3000', { timeout: 5000 });
      console.log(`   ✅ Frontend Port 3000 Status: ${frontendResponse3000.status}`);
    } catch (error) {
      console.log(`   ❌ Frontend Port 3000 Error: ${error.message}`);
    }
    
    // Test port 3002
    try {
      const frontendResponse3002 = await axios.get('http://localhost:3002', { timeout: 5000 });
      console.log(`   ✅ Frontend Port 3002 Status: ${frontendResponse3002.status}`);
    } catch (error) {
      console.log(`   ❌ Frontend Port 3002 Error: ${error.message}`);
    }
    
    // Test ativos page
    console.log('\n3. Testing Ativos Page...');
    try {
      const ativosPageResponse = await axios.get('http://localhost:3000/ativos', { timeout: 5000 });
      console.log(`   ✅ Ativos Page Status: ${ativosPageResponse.status}`);
    } catch (error) {
      console.log(`   ❌ Ativos Page Error: ${error.message}`);
    }
    
    // Test clientes API
    console.log('\n4. Testing Clientes API...');
    const clientesResponse = await axios.get('http://localhost:3001/api/clientes');
    console.log(`   ✅ Clientes API Status: ${clientesResponse.status}`);
    console.log(`   ✅ Clientes Count: ${clientesResponse.data.clientes.length}`);
    
    console.log('\n🎉 Integration test completed successfully!');
    console.log('\nNext steps:');
    console.log('- Open http://localhost:3000 in your browser');
    console.log('- Navigate to /ativos to see the assets list');
    console.log('- Navigate to /clientes to see the clients page');
    console.log('- Test creating a new client at /clientes/novo');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testIntegration();
