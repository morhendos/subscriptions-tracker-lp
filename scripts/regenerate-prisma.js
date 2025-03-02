// Force regeneration of Prisma client with the updated schema
const { execSync } = require('child_process');

console.log('Cleaning Prisma client cache...');
try {
  execSync('rm -rf node_modules/.prisma');
} catch (error) {
  console.error('Failed to clean Prisma cache, continuing anyway:', error.message);
}

console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client successfully generated!');
} catch (error) {
  console.error('Failed to generate Prisma client:', error.message);
  process.exit(1);
}
