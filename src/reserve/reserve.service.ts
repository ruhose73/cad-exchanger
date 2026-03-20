import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ReserveSeatDto, ReserveSeatResponseDto } from 'src/reserve/dto/reserve-seat.dto';
import { GetSeatsResponseDto } from 'src/reserve/dto/get-seats.dto';
import { RedisService } from 'src/redis/redis.service';
import { Repository } from 'typeorm';
import { Seats } from 'src/entities/seat.entity';
import { SET_TYPE } from 'src/enum/set-type.enum';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Seats)
    private seatRepository: Repository<Seats>,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Reserve the seat
   * @param dto
   */
  async reserveSeat(dto: ReserveSeatDto): Promise<ReserveSeatResponseDto> {
    const exists = await this.redisService.sismember(SET_TYPE.ALL_SEATS, dto.seat_id);
    if (!exists) {
      throw new NotFoundException('Такого места не существует');
    }

    const lockSeat = await this.redisService.sadd(SET_TYPE.OCCUPIED, dto.seat_id);
    if (!lockSeat) {
      throw new BadRequestException('Место уже зарезервировано');
    }

    try {
      const reserve = await this.seatRepository.update(
        { seatId: dto.seat_id, occupied: false },
        { occupied: true, userId: dto.user_id, reservedAt: new Date() },
      );

      if (reserve.affected === 0) {
        throw new Error('Место уже зарезервировано');
      }

      return {
        ...dto,
        status: true,
      };
    } catch (error) {
      Logger.error(error, ReserveService.name);
      await this.redisService.srem(SET_TYPE.OCCUPIED, dto.seat_id);
      throw new BadRequestException('Ошибка резервации места');
    }
  }

  /**
   * Get seats
   */
  async getSeats(): Promise<GetSeatsResponseDto[]> {
    try {
      const allSeats = await this.redisService.smembers(SET_TYPE.ALL_SEATS);
      const occupied = await this.redisService.smembers(SET_TYPE.OCCUPIED);
      const occupiedSet = new Set(occupied);
      return allSeats.map((id) => ({
        seat_id: id,
        occupied: occupiedSet.has(id),
      }));
    } catch (error) {
      Logger.error(error, ReserveService.name);
      throw new BadRequestException(`Ошибка получения мест`);
    }
  }
}
