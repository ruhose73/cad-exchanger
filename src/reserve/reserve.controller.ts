import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ReserveService } from './reserve.service';
import { GetSeatsResponseDto } from 'src/reserve/dto/get-seats.dto';
import { ReserveSeatDto, ReserveSeatResponseDto } from 'src/reserve/dto/reserve-seat.dto';

@ApiTags('Reserve service')
@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  /**
   * Reserve the seat
   * @param dto
   */
  @Post('')
  @ApiOkResponse({
    description: 'Резервация места',
    type: ReserveSeatResponseDto,
    isArray: false,
  })
  @HttpCode(HttpStatus.OK)
  reserveSeat(@Body() dto: ReserveSeatDto): Promise<ReserveSeatResponseDto> {
    return this.reserveService.reserveSeat(dto);
  }

  /**
   * Get seats
   */
  @Get('')
  @ApiOkResponse({
    description: 'Возвращает места',
    type: GetSeatsResponseDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  getSeats(): Promise<GetSeatsResponseDto[]> {
    return this.reserveService.getSeats();
  }
}
