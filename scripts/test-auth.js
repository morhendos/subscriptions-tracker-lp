// Authentication test script
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testAuth() {
  console.log('===============================================');
  console.log('AUTHENTICATION TEST SCRIPT');
  console.log('===============================================');
  
  try {
    console.log('1. Testing database connection...');
    // Check if we can query the database at all
    const userCount = await prisma.user.count();
    console.log(`   Success! Found ${userCount} users in the database.`);
    
    console.log('2. Finding admin user...');
    // Check if we can find the specific admin user
    const adminUser = await prisma.user.findFirst({
      where: {
        email: 'morhendos@gmail.com',
      },
    });
    
    if (!adminUser) {
      console.error('   ERROR: Admin user not found!');
      return;
    }
    
    console.log('   Success! Found admin user:');
    console.log('   - ID:', adminUser.id);
    console.log('   - Email:', adminUser.email);
    console.log('   - Email Verified:', adminUser.emailVerified);
    console.log('   - Has Password:', !!adminUser.hashedPassword);
    
    // Log the roles (safely)
    let roles = [];
    try {
      if (typeof adminUser.roles === 'string') {
        roles = JSON.parse(adminUser.roles);
      } else {
        roles = adminUser.roles;
      }
      console.log('   - Roles:', JSON.stringify(roles));
    } catch (e) {
      console.log('   - Roles: [Error parsing roles]', adminUser.roles);
    }
    
    console.log('3. Testing password verification...');
    // Test password verification with a dummy password
    // IMPORTANT: Replace with your actual password when running the script
    const testPassword = 'your-actual-password';
    const isPasswordValid = await bcrypt.compare(testPassword, adminUser.hashedPassword);
    
    console.log('   Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('   Password verification failed - this is expected if you didn\'t use your real password');
      console.log('   To properly test, edit this script and replace "your-actual-password" with your real password');
    }
    
    console.log('4. Check database URL and connection details...');
    // Log database URL (safely without showing credentials)
    const dbUrl = process.env.DATABASE_URL || 'Not defined in environment';
    if (dbUrl === 'Not defined in environment') {
      console.log('   ERROR: DATABASE_URL is not defined in the environment!');
    } else {
      // Safely display DB URL by masking password
      const maskedUrl = dbUrl.replace(/\/\/(.*):(.*)@/, '//****:****@');
      console.log('   Database URL:', maskedUrl);
      
      // Extract database name for verification
      try {
        const dbName = dbUrl.split('/').pop().split('?')[0];
        console.log('   Database name:', dbName);
      } catch (e) {
        console.log('   Could not extract database name from URL');
      }
    }
    
    // Check that we're looking at the right users collection
    console.log('5. Checking users collection mapping...');
    const dbInfo = await prisma.$queryRaw`db.stats()`;
    console.log('   Database stats:', JSON.stringify(dbInfo, null, 2));
    
    const collections = await prisma.$queryRaw`show collections`;
    console.log('   Collections in database:', JSON.stringify(collections, null, 2));
    
  } catch (error) {
    console.error('TEST FAILED with error:', error);
  } finally {
    await prisma.$disconnect();
    console.log('===============================================');
    console.log('TEST COMPLETED');
    console.log('===============================================');
  }
}

testAuth()
  .then(() => {
    console.log('Authentication test script finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
