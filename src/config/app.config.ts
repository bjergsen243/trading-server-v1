import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    name: process.env.APP_NAME || 'trading-server',
    env: process.env.APP_ENV || 'development',
    prefixUrl: '/api',
    url: process.env.APP_URL || 'http://localhost:3000',
    port: process.env.APP_PORT || 3000,
    swagger: {
      title: 'Trading Server',
      description: 'Swagger documentation for Trading Server',
      version: process.env.SWAGGER_VERSION || '1.0.0',
      user: process.env.SWAGGER_USER || 'admin',
      password: process.env.SWAGGER_PASSWORD || '1',
      path: '/docs/trading-server',
    },
  };
});
