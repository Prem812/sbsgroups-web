import { Test, TestingModule } from '@nestjs/testing';
import { HeroCarouselService } from './hero-carousel.service';

describe('HeroCarouselService', () => {
  let service: HeroCarouselService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroCarouselService],
    }).compile();

    service = module.get<HeroCarouselService>(HeroCarouselService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
