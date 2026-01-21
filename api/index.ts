import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { Request, Response } from 'express';
import { AppModule } from '../src/app.module';

let cachedHandler: ((req: Request, res: Response) => Promise<void>) | null = null;

async function createHandler() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3001';
  app.enableCors({
    origin: [frontendUrl],
    methods: ['GET', 'POST'],
  });

  await app.init();
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req: Request, res: Response) {
  if (!cachedHandler) {
    cachedHandler = await createHandler();
  }

  return cachedHandler(req, res);
}
