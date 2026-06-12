import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroCarouselModule } from './hero-carousel/hero-carousel.module';
import { FaqModule } from './faq/faq.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HeroCarouselModule, 
    FaqModule, 
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
