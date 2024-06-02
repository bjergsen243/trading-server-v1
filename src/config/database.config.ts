import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    uri:
      process.env.MONGO_URI ||
      'mongodb://127.0.0.1:27017/trading-server?directConnection=true',
  };
});
