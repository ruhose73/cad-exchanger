/* eslint-disable jsdoc/require-jsdoc */
import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from '../config/redis.config';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
          db: redisConfig.db,
          retryStrategy: redisConfig.retryStrategy,
        });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
