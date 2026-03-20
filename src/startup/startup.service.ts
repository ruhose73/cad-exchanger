import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seats } from 'src/entities/seat.entity';
import { SET_TYPE } from 'src/enum/set-type.enum';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Seats)
    private seatRepository: Repository<Seats>,
    private redisService: RedisService,
  ) {}

  /**
   * Create mock data
   */
  async onApplicationBootstrap() {
    let seats = await this.seatRepository.find({ select: ['seatId', 'occupied'] });

    if (seats.length === 0) {
      const newSeats = [];
      for (let i = 0; i < 100; i++) {
        newSeats.push({
          occupied: false,
          userId: null,
          reservedAt: null,
        });
      }
      await this.seatRepository.save(newSeats);
      seats = await this.seatRepository.find({ select: ['seatId', 'occupied'] });
    }

    const allSeatIds = seats.map((s) => s.seatId);
    const occupiedSeatIds = seats.filter((s) => s.occupied === true).map((s) => s.seatId);

    await this.redisService.delSet(SET_TYPE.ALL_SEATS);
    await this.redisService.delSet(SET_TYPE.OCCUPIED);

    await this.redisService.saddBatch(SET_TYPE.ALL_SEATS, allSeatIds);
    if (occupiedSeatIds.length > 0) {
      await this.redisService.saddBatch(SET_TYPE.OCCUPIED, occupiedSeatIds);
    }
  }
}
