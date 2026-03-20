import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('seats', { comment: 'Таблица мест' })
export class Seats {
  @PrimaryColumn({
    primary: true,
    name: 'seat_id',
    type: 'uuid',
    generated: 'uuid',
  })
  seatId: string;

  @Column('boolean', {
    name: 'status',
    default: () => 'false',
    comment: 'Флаг, показывающий является ли место занятым',
  })
  occupied: boolean;

  @Column('uuid', { name: 'user_id', nullable: true, comment: 'Идентификатор пользователя' })
  userId: string;

  @Column('timestamp without time zone', {
    name: 'reserved_at',
    nullable: true,
    comment: 'Время резерва',
  })
  reservedAt: Date;
}
