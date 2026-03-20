import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { GracefulShutdownService } from './shutdown.service';

@Module({
  providers: [GracefulShutdownService],
  controllers: [HealthController],
})
export class HealthModule {}
