// File Location: backend/src/hero-carousel/hero-carousel.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Aapka prisma service path

@Injectable()
export class HeroCarouselService {
  constructor(private prisma: PrismaService) {}

  // 1. Admin/Public: Fetch all slides sorted by order
  async getAllSlides() {
    return this.prisma.heroCarousel.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  // 2. Public Only: Fetch only active slides
  async getActiveSlides() {
    return this.prisma.heroCarousel.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  // 3. Admin: Upsert (Create or Update) Slide
  async upsertSlide(id: string | null, data: any) {
    if (id) {
      const exists = await this.prisma.heroCarousel.findUnique({ where: { id } });
      if (!exists) throw new NotFoundException('Slide not found');
      
      return this.prisma.heroCarousel.update({
        where: { id },
        data: { ...data },
      });
    }
    
    return this.prisma.heroCarousel.create({
      data: { ...data },
    });
  }

  // 4. Admin: Delete Slide
  async deleteSlide(id: string) {
    return this.prisma.heroCarousel.delete({ where: { id } });
  }
}