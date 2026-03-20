import { ApiProperty } from '@nestjs/swagger';

export class GetSeatsResponseDto {
  @ApiProperty({
    description: 'ID места',
    example: '8b675eb5-d093-4a11-a450-d77c0271ef56',
  })
  seat_id: string;

  @ApiProperty({
    description: 'Статус занятости (true - занято)',
    example: true,
  })
  occupied: boolean;
}
