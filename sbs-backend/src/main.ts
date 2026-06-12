// File Location: src/main.ts (Backend)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 SYSTEM INTEGRATION: Enable CORS safely for frontend requests
  app.enableCors({
    origin: 'http://localhost:3000', // Aapke Next.js frontend ka URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Agar aapne koi global prefix set kiya hua hai, jaise /api
  app.setGlobalPrefix('api'); 

  await app.listen(4000); // Sahi port ensure karein
  console.log('🚀 NestJS Backend Engine running on: http://localhost:4000');
}
bootstrap();