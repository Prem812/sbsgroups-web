import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroCarouselDto } from './create-hero-carousel.dto';

export class UpdateHeroCarouselDto extends PartialType(CreateHeroCarouselDto) {}
