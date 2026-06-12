import { Test, TestingModule } from '@nestjs/testing';
import { HeroCarouselController } from './hero-carousel.controller';
import { HeroCarouselService } from './hero-carousel.service';

describe('HeroCarouselController', () => {
  let controller: HeroCarouselController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroCarouselController],
      providers: [HeroCarouselService],
    }).compile();

    controller = module.get<HeroCarouselController>(HeroCarouselController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
