#!/usr/bin/env node
/**
 * Script to create initial admin user
 * 
 * Run with: node scripts/create-admin.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const { randomBytes } = require('crypto');

const prisma = new PrismaClient();

// Create readline interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt function for getting user input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Generate a random token
function generateToken(length = 32) {
  return randomBytes(length).toString('hex');
}

// Main function
async function createAdmin() {
  try {
    console.log('\n🔐 Admin User Creation Tool 🔐\n');
    
    // Get admin details
    const email = await prompt('Enter admin email: ');
    const name = await prompt('Enter admin name: ');
    const password = await prompt('Enter admin password (min 8 chars): ');
    
    if (!email || !name || !password) {
      console.error('❌ All fields are required.');
      return;
    }
    
    if (password.length < 8) {
      console.error('❌ Password must be at least 8 characters.');
      return;
    }
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      console.error(`❌ User with email ${email} already exists.`);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Define admin role
    const roles = [
      { id: '1', name: 'user' },
      { id: '2', name: 'admin' }
    ];
    
    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        roles,
        emailVerified: true,
      }
    });
    
    console.log(`\n✅ Admin user created successfully!`);
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.name}`);
    console.log(`ID: ${user.id}`);
    console.log(`Roles: ${JSON.stringify(roles)}`);
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

// Execute the main function
createAdmin();
