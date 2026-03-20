import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Reserve Service API')
  .setDescription('API документация для reserve-сервиса')
  .setVersion('1.0')
  .build();
