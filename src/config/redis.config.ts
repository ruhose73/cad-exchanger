import * as dotenv from 'dotenv';
dotenv.config();

/* eslint-disable jsdoc/require-jsdoc */
export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
  retryStrategy?: (times: number) => number;
}

/* eslint-disable jsdoc/require-jsdoc */
export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  db: parseInt(process.env.REDIS_DB, 10) || 0,
  retryStrategy: (times) => Math.min(times * 50, 2000),
};
