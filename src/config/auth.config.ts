import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    accessTokenExpire: '1d',
    refreshTOkenExpire: 2592000, // 30 days
    accessToken: process.env.JWT_SECRET_ACCESS,
    refreshToken: process.env.JWT_SECRET_REFRESH,
    signMessage: process.env.SIGN_MESSAGE || 'trading-server',
  };
});
