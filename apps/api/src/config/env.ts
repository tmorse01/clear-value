/**
 * Environment configuration
 */

export interface Config {
  port: number;
  host: string;
  nodeEnv: 'development' | 'production' | 'test';
  corsOrigin: string | string[] | boolean;
  maxFileSize: number;
}

export function getConfig(): Config {
  return {
    port: Number(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0',
    nodeEnv: (process.env.NODE_ENV as Config['nodeEnv']) || 'development',
    corsOrigin:
      process.env.NODE_ENV === 'production'
        ? process.env.CORS_ORIGIN?.split(',') || ['https://clearvalue.taylormorsedev.com']
        : true,
    maxFileSize: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB default
  };
}

