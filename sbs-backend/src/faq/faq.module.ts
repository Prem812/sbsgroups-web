import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],  // 👈 yeh line zaroori hai
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}