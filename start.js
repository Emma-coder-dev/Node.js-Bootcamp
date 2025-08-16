#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Task Manager API Setup\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('📝 Creating .env file from template...');
  try {
    fs.copyFileSync('env.example', '.env');
    console.log('✅ .env file created successfully!');
    console.log('⚠️  Please edit .env file with your configuration values.');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('\n📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed');
}

// Check MongoDB connection
console.log('\n🔍 Checking MongoDB connection...');
console.log('⚠️  Make sure MongoDB is running on your system or you have a MongoDB Atlas connection string.');

console.log('\n📋 Next steps:');
console.log('1. Edit .env file with your MongoDB connection string and JWT secret');
console.log('2. Start MongoDB (if using local installation)');
console.log('3. Run: npm run dev (for development)');
console.log('4. Run: npm start (for production)');
console.log('5. Test the API at: http://localhost:3000/api/health');

console.log('\n📚 For more information, check the README.md file');
console.log('🌐 API will be available at: http://localhost:3000/api');

console.log('\n🎉 Setup complete! Happy coding!');
