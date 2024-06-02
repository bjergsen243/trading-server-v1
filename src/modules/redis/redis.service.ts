import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.providers';

@Injectable()
export class RedisService {
  public constructor(
    @Inject('REDIS_CLIENT') private readonly client: RedisClient,
  ) {}
}
