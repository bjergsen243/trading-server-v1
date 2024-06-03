import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';
import { RedisModule } from 'src/modules/redis/redis.module';
import {
  RefreshToken,
  RefreshTokenSchema,
} from 'src/schemas/refresh-token.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ load: config }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get<string>('database.uri') };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),

    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        return { redis: redisConfig };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot({ wildcard: true }),
    RedisModule,
  ],
  providers: [],
  exports: [MongooseModule, ConfigModule, BullModule, RedisModule],
})
export class SharedModule {}
