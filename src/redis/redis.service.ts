import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { SET_TYPE } from 'src/enum/set-type.enum';

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  /**
   * Adds an element to the specified set.
   * @param set
   * @param key
   */
  async sadd(set: SET_TYPE, key: string): Promise<boolean> {
    const added = await this.redis.sadd(set, key);
    return added === 1;
  }

  /**
   * Checks whether an element exists in the specified set.
   * @param set
   * @param value
   */
  async sismember(set: SET_TYPE, value: string): Promise<boolean> {
    const exists = await this.redis.sismember(set, value);
    return exists === 1;
  }

  /**
   * Removes an element from the specified set.
   * @param set
   * @param value
   */
  async srem(set: SET_TYPE, value: string): Promise<boolean> {
    const removed = await this.redis.srem(set, value);
    return removed === 1;
  }

  /**
   * Returns all elements of the specified set.
   * @param set
   */
  async smembers(set: SET_TYPE): Promise<string[]> {
    return await this.redis.smembers(set);
  }

  /**
   * Removes all elements from a set.
   * @param set
   */
  async delSet(set: SET_TYPE): Promise<void> {
    await this.redis.del(set);
  }

  /**
   * Adds multiple elements to the specified set.
   * @param set
   * @param values
   */
  async saddBatch(set: SET_TYPE, values: string[]): Promise<number> {
    return await this.redis.sadd(set, ...values);
  }

  /**
   * Actions upon destroy
   */
  async onModuleDestroy() {
    await this.redis.quit();
  }
}
