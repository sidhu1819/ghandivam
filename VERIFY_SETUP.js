// Verification Script - Run this to check if everything is set up correctly
// Run with: node VERIFY_SETUP.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Ghandivam Setup...\n');

const errors = [];
const warnings = [];

// Check client files
console.log('📁 Checking Client Files...');
const clientFiles = [
  'client/src/main.jsx',
  'client/src/App.jsx',
  'client/src/index.css',
  'client/src/index.html',
  'client/src/components/ProtectedRoute.jsx',
  'client/src/context/AuthContext.jsx',
  'client/src/pages/Login.jsx',
  'client/src/pages/Register.jsx',
  'client/src/pages/Home.jsx',
  'client/src/pages/MyProjects.jsx',
  'client/src/pages/CreateProject.jsx',
  'client/src/pages/JoinProject.jsx',
  'client/src/pages/OngoingProjects.jsx',
  'client/src/pages/Profile.jsx',
  'client/src/pages/UserProfile.jsx',
  'client/src/pages/Users.jsx',
  'client/src/pages/SkillLearning.jsx',
];

clientFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${file}`);
  } else {
    errors.push(`  ❌ Missing: ${file}`);
    console.log(`  ❌ ${file} - MISSING`);
  }
});

// Check server files
console.log('\n📁 Checking Server Files...');
const serverFiles = [
  'server/index.js',
  'server/models.js',
  'server/package.json',
];

serverFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${file}`);
  } else {
    errors.push(`  ❌ Missing: ${file}`);
    console.log(`  ❌ ${file} - MISSING`);
  }
});

// Check .env file
console.log('\n📁 Checking Environment Files...');
const envPath = path.join(__dirname, 'server', '.env');
if (fs.existsSync(envPath)) {
  console.log('  ✅ server/.env exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('MONGO_URI')) {
    console.log('  ✅ MONGO_URI found in .env');
  } else {
    warnings.push('  ⚠️  MONGO_URI not found in .env');
  }
} else {
  warnings.push('  ⚠️  server/.env file not found (will use defaults)');
  console.log('  ⚠️  server/.env - NOT FOUND (will use defaults)');
}

// Check package.json dependencies
console.log('\n📦 Checking Dependencies...');
try {
  const clientPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'client', 'package.json'), 'utf8'));
  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'axios', 'lucide-react'];
  requiredDeps.forEach(dep => {
    if (clientPkg.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${clientPkg.dependencies[dep]}`);
    } else {
      errors.push(`  ❌ Missing dependency: ${dep}`);
      console.log(`  ❌ ${dep} - MISSING`);
    }
  });
} catch (e) {
  errors.push(`  ❌ Cannot read client/package.json`);
}

try {
  const serverPkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'server', 'package.json'), 'utf8'));
  const requiredDeps = ['express', 'mongoose', 'cors', 'bcryptjs', 'jsonwebtoken', 'dotenv'];
  requiredDeps.forEach(dep => {
    if (serverPkg.dependencies[dep]) {
      console.log(`  ✅ ${dep}: ${serverPkg.dependencies[dep]}`);
    } else {
      errors.push(`  ❌ Missing dependency: ${dep}`);
      console.log(`  ❌ ${dep} - MISSING`);
    }
  });
} catch (e) {
  errors.push(`  ❌ Cannot read server/package.json`);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(50));

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed! Setup looks good.');
} else {
  if (errors.length > 0) {
    console.log(`\n❌ ERRORS (${errors.length}):`);
    errors.forEach(err => console.log(err));
  }
  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach(warn => console.log(warn));
  }
}

console.log('\n💡 Next Steps:');
console.log('  1. Install dependencies: cd client && npm install && cd ../server && npm install');
console.log('  2. Create .env file in server directory (see ENV_SETUP_INSTRUCTIONS.md)');
console.log('  3. Start backend: cd server && npm start');
console.log('  4. Start frontend: cd client && npm run dev');
console.log('  5. Open browser: http://localhost:5173\n');

