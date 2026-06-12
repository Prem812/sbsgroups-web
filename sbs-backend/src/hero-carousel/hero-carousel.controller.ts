// File Location: backend/src/hero-carousel/hero-carousel.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { HeroCarouselService } from './hero-carousel.service';

@Controller('hero-carousel')
export class HeroCarouselController {
  constructor(private readonly heroService: HeroCarouselService) {}

  @Get('admin-list')
  async getAdminSlides() {
    return this.heroService.getAllSlides();
  }

  @Get('public-list')
  async getPublicSlides() {
    return this.heroService.getActiveSlides();
  }

  @Post('save')
  async saveSlide(@Query('id') id: string, @Body() body: any) {
    // Agar query parameters me id nahi h to null pass hoga (matlab Create request h)
    return this.heroService.upsertSlide(id || null, body);
  }

  @Delete('delete/:id')
  async deleteSlide(@Param('id') id: string) {
    return this.heroService.deleteSlide(id);
  }
}