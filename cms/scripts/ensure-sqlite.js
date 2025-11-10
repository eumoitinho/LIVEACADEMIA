const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sqlitePath = path.join(__dirname, '..', 'node_modules', '.pnpm', 'better-sqlite3@11.3.0', 'node_modules', 'better-sqlite3');
const buildPath = path.join(sqlitePath, 'build', 'Release', 'better_sqlite3.node');

if (!fs.existsSync(buildPath)) {
  console.log('🔧 Compilando better-sqlite3...');
  try {
    const originalDir = process.cwd();
    process.chdir(sqlitePath);
    execSync('npm run build-release', { stdio: 'inherit' });
    process.chdir(originalDir);
    console.log('✅ better-sqlite3 compilado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao compilar better-sqlite3:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ better-sqlite3 já está compilado');
}

