import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

dotenv.config();

/* eslint-disable jsdoc/require-jsdoc */
export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow('PORT');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, '0.0.0.0');
  Logger.log(`Application is running on: http://localhost:${PORT}`, AppModule.name);
  Logger.log(`Documentation is running on: http://localhost:${PORT}/docs`, AppModule.name);
};

bootstrap();
