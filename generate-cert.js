// Script to generate self-signed certificate for local HTTPS development
// Run: node generate-cert.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔐 Generating self-signed certificate for HTTPS...\n');

try {
  // Check if openssl is available
  try {
    execSync('openssl version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ OpenSSL not found. Please install OpenSSL first.');
    console.log('\nWindows: Download from https://slproweb.com/products/Win32OpenSSL.html');
    console.log('Mac: brew install openssl');
    console.log('Linux: sudo apt-get install openssl\n');
    process.exit(1);
  }

  const certPath = path.resolve(__dirname, 'cert.pem');
  const keyPath = path.resolve(__dirname, 'key.pem');

  // Generate self-signed certificate
  const command = `openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=VN/ST=HCM/L=HCM/O=HLHV/OU=Dev/CN=localhost"`;
  
  execSync(command, { stdio: 'inherit' });

  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    console.log('\n✅ Certificate generated successfully!');
    console.log('📁 Files created:');
    console.log('   - cert.pem (certificate)');
    console.log('   - key.pem (private key)');
    console.log('\n🚀 Now you can run:');
    console.log('   npm run dev  →  Starts with HTTPS on https://localhost:3000');
    console.log('\n⚠️  Note: Browser will show security warning (self-signed cert)');
    console.log('   Click "Advanced" → "Proceed to localhost" to continue\n');
  } else {
    console.error('❌ Certificate generation failed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error generating certificate:', error.message);
  process.exit(1);
}

