#!/usr/bin/env node
/**
 * Environment Setup Script
 * Copies the appropriate .env file based on the environment
 */

const fs = require('fs')
const path = require('path')

const environment = process.argv[2] || 'development'
const validEnvironments = ['development', 'production']

if (!validEnvironments.includes(environment)) {
  console.error(`❌ Invalid environment: ${environment}`)
  console.error(`Valid environments: ${validEnvironments.join(', ')}`)
  process.exit(1)
}

const sourceFile = path.join(__dirname, '..', `.env.${environment}`)
const targetFile = path.join(__dirname, '..', '.env')

try {
  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Source file not found: ${sourceFile}`)
    process.exit(1)
  }

  // Copy the environment file
  fs.copyFileSync(sourceFile, targetFile)
  
  console.log(`✅ Environment set to: ${environment}`)
  console.log(`📁 Copied: .env.${environment} → .env`)
  
  // Verify the copy was successful
  const content = fs.readFileSync(targetFile, 'utf8')
  const nodeEnvMatch = content.match(/NODE_ENV=(.+)/)
  
  if (nodeEnvMatch && nodeEnvMatch[1] === environment) {
    console.log(`🔧 NODE_ENV: ${nodeEnvMatch[1]}`)
    console.log(`🚀 Ready to start the app!`)
  } else {
    console.warn('⚠️  Warning: NODE_ENV might not be set correctly')
  }
  
} catch (error) {
  console.error(`❌ Error setting up environment:`, error.message)
  process.exit(1)
} 