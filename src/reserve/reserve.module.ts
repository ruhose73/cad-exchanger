import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { Seats } from 'src/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seats])],
  controllers: [ReserveController],
  providers: [ReserveService],
  exports: [ReserveService],
})
export class ReserveModule {}
