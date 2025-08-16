const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:3000/api';
let authToken = null;
let taskId = null;

// Test data
const testUser = {
  username: 'testuser_' + Date.now(),
  email: `test${Date.now()}@example.com`,
  password: 'password123'
};

const testTask = {
  title: 'Test task for API testing',
  completed: false
};

// Helper function to make authenticated requests
const makeAuthRequest = async (method, endpoint, data = null) => {
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    }
  };
  
  if (data) {
    config.data = data;
  }
  
  return axios(config);
};

// Test functions
const testHealthCheck = async () => {
  try {
    console.log('\n🔍 Testing Health Check...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data.message);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testUserRegistration = async () => {
  try {
    console.log('\n👤 Testing User Registration...');
    const response = await axios.post(`${BASE_URL}/auth/signup`, testUser);
    console.log('✅ User registered successfully:', response.data.message);
    authToken = response.data.data.token;
    return true;
  } catch (error) {
    console.error('❌ User registration failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testCreateTask = async () => {
  try {
    console.log('\n📝 Testing Task Creation...');
    const response = await makeAuthRequest('POST', '/tasks', testTask);
    console.log('✅ Task created successfully:', response.data.message);
    taskId = response.data.data.task._id;
    return true;
  } catch (error) {
    console.error('❌ Task creation failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testGetTasks = async () => {
  try {
    console.log('\n📋 Testing Get Tasks...');
    const response = await makeAuthRequest('GET', '/tasks');
    console.log('✅ Tasks retrieved successfully');
    console.log(`   Found ${response.data.data.tasks.length} tasks`);
    return true;
  } catch (error) {
    console.error('❌ Get tasks failed:', error.response?.data?.message || error.message);
    return false;
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting Task Manager API Tests...\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'Create Task', fn: testCreateTask },
    { name: 'Get Tasks', fn: testGetTasks }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passedTests++;
      }
    } catch (error) {
      console.error(`❌ ${test.name} test crashed:`, error.message);
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`   Passed: ${passedTests}/${totalTests}`);
  console.log(`   Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! The API is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the API implementation.');
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testUser, testTask };
