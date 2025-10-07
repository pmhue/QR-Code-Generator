import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Listen on all addresses including LAN and public
    open: true,
    // Enable HTTPS if certificates exist, otherwise use HTTP
    https: fs.existsSync(path.resolve(__dirname, 'cert.pem')) && fs.existsSync(path.resolve(__dirname, 'key.pem'))
      ? {
          key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
        }
      : false,
    // CORS settings for both HTTP and HTTPS
    cors: true,
    // Allow both HTTP and HTTPS connections
    strictPort: false,
  },
  preview: {
    port: 4173,
    host: true,
    https: fs.existsSync(path.resolve(__dirname, 'cert.pem')) && fs.existsSync(path.resolve(__dirname, 'key.pem'))
      ? {
          key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
        }
      : false,
  },
});

