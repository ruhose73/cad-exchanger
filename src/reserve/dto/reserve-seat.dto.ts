import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReserveSeatDto {
  @ApiProperty({
    description: 'ID места',
    example: '8b675eb5-d093-4a11-a450-d77c0271ef56',
  })
  @IsUUID()
  seat_id: string;

  @ApiProperty({
    description: 'ID пользователя',
    example: '23b36d08-03fb-4014-b1b4-084924d89d45',
  })
  @IsUUID()
  user_id: string;
}

export class ReserveSeatResponseDto extends ReserveSeatDto {
  @ApiProperty({
    description: 'Статус транзакции',
    example: true,
  })
  status: boolean;
}
