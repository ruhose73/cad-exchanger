import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { HealthModule } from './health/health.module';
import { envValidate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validate: envValidate,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    HealthModule,
  ],
})
export class AppModule {}
