import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find local IP address for Android phone testing
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const localIp = getLocalIp();

console.log('\n======================================================');
console.log('⚡ STARTING SIGMA WEB DEV LEARNING APP (GEN-Z EDITION) ⚡');
console.log('======================================================\n');
console.log(`📱 Android Mobile Access: http://${localIp}:3000`);
console.log(`💻 Desktop Access:       http://localhost:3000`);
console.log(`🔌 Backend API Server:   http://localhost:5000\n`);

// Start Backend
const server = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'server'),
  shell: true,
  stdio: 'inherit'
});

// Start Frontend
const client = spawn('npm', ['run', 'dev', '--', '--host'], {
  cwd: path.join(__dirname, 'client'),
  shell: true,
  stdio: 'inherit'
});

const cleanup = () => {
  console.log('\nShutting down servers...');
  server.kill();
  client.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

