import { startServer } from './server.js';
import { getConfig } from './config/env.js';

const config = getConfig();

// Start the server
startServer({ port: config.port, host: config.host }).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
