// File Location: backend/src/faq/faq.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FaqService } from './faq.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('faq') // 🔥 FIXED: 'api/faq' se badal kar sirf 'faq' kiya
export class FaqController {
  constructor(
    private readonly faqService: FaqService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Route: GET http://localhost:4000/api/faq/admin-list
  @Get('admin-list')
  async getAdminFaqs() {
    return this.faqService.getAllFaqs();
  }

  // Route: GET http://localhost:4000/api/faq/pinned
  @Get('pinned')
  async getPinned() {
    return this.faqService.getPinnedFaqs();
  }

  // Route: GET http://localhost:4000/api/faq/user-inquiries
  @Get('user-inquiries')
  async getUserInquiries() {
    return this.faqService.getAllUserInquiries();
  }

  // Route: POST http://localhost:4000/api/faq/save
  @Post('save')
  async saveFaq(@Query('id') id: string, @Body() body: any) {
    return this.faqService.upsertFaq(id || null, body);
  }

  // Route: POST http://localhost:4000/api/faq/upload-media
  @Post('upload-media')
  @UseInterceptors(FileInterceptor('image'))
  async uploadEditorMedia(@UploadedFile() file: Express.Multer.File) {
    const cloudResponse = await this.cloudinaryService.uploadAndCompressFile(file);
    return {
      success: 1,
      file: {
        url: cloudResponse.secure_url,
      },
    };
  }

  // Route: POST http://localhost:4000/api/faq/submit-question
  @Post('submit-question')
  async submitQuestionFromPublic(@Body() body: any) {
    return this.faqService.registerUserQuestion(body);
  }

  // Route: POST http://localhost:4000/api/faq/reply-inquiry
  @Post('reply-inquiry')
  async resolveInquiryAndSendMail(@Body() body: any) {
    return this.faqService.sendResolutionEmail(body);
  }

  // Route: DELETE http://localhost:4000/api/faq/delete/:id
  @Delete('delete/:id')
  async deleteFaq(@Param('id') id: string) {
    return this.faqService.deleteFaq(id);
  }
}