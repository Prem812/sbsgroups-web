import { Module } from '@nestjs/common';
import { HeroCarouselService } from './hero-carousel.service';
import { HeroCarouselController } from './hero-carousel.controller';

@Module({
  controllers: [HeroCarouselController],
  providers: [HeroCarouselService],
})
export class HeroCarouselModule {}
