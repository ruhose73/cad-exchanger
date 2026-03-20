import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { HealthModule } from './health/health.module';
import { envValidate } from './env.validation';
import { ReserveModule } from './reserve/reserve.module';
import { StartupModule } from './startup/startup.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate: envValidate,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ReserveModule,
    RedisModule,
    StartupModule,
    HealthModule,
  ],
})
export class AppModule {}
