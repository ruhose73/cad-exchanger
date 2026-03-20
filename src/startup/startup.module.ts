import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StartupService } from './startup.service';
import { Seats } from 'src/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seats])],
  providers: [StartupService],
  exports: [StartupService],
})
export class StartupModule {}
