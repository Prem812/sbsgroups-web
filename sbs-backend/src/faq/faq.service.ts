// File Location: backend/src/faq/faq.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class FaqService {
  private emailTransporter;

  constructor(private prisma: PrismaService) {
    this.emailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 465,
      secure: true,
      auth: {
        user: process.env.SYSTEM_ALERT_EMAIL || 'system-alerts@sbsgroups.co.in', 
        pass: process.env.SYSTEM_ALERT_PASSWORD || 'xxxx xxxx xxxx xxxx',          
      },
    });
  }

  async getAllFaqs() {
    return this.prisma.faqItem.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getPinnedFaqs() {
    return this.prisma.faqItem.findMany({
      where: { isActive: true, isPinned: true },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getAllUserInquiries() {
    // Dynamic table existence safety backup query
    if (this.prisma && (this.prisma as any).userSubmittedQuestion) {
      return (this.prisma as any).userSubmittedQuestion.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }
    return [];
  }

  async upsertFaq(id: string | null, data: any) {
    const faqData = {
      question: data.question,
      slug: data.slug || data.question.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
      answerJson: data.answerJson, 
      isPinned: data.isPinned ?? false,
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    };

    if (id) {
      return this.prisma.faqItem.update({
        where: { id },
        data: faqData,
      });
    }
    return this.prisma.faqItem.create({
      data: faqData,
    });
  }

  // 📡 USER SUBMISSION: Non-blocking mail failure protection mapping
  async registerUserQuestion(data: any) {
    const incomingMetadata = data.dynamicMetaAttributes || {};

    // 1. Core Data Matrix safely write into tables instantly
    const newInquiry = await (this.prisma as any).userSubmittedQuestion.create({
      data: {
        email: data.email,
        question: data.question,
        isAnswered: false,
        isPublishedFaq: false,
        adminAnswerJson: incomingMetadata, 
      },
    });

    // 2. 🔥 CRITICAL FIX: Mail function ko 'await' nahi karenge direct bagal me error block ke sath fire karenge
    // Isse agar mail transporter connect na bhi ho, toh frontend par 500 status crash nahi jayega!
    this.emailTransporter.sendMail({
      from: '"SBS CRM Network Systems" <system-alerts@sbsgroups.co.in>',
      to: 'info@sbsgroups.co.in', 
      subject: '🚨 CRITICAL DISPATCH: Unresolved Query Received from Public Gateway',
      html: `
        <div style="font-family: sans-serif; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px;">
          <h2 style="color: #0f172a; margin-top: 0;">New Knowledge Pool Query Provisioned</h2>
          <hr style="border: 0; border-top: 1px solid #e2e8f0;"/>
          <p><b>Sender Email:</b> ${data.email}</p>
          <p><b>Question Parameters:</b> ${data.question}</p>
          <br/>
          <p style="font-size: 11px; color: #64748b;">Entity ID: ${newInquiry.id}</p>
        </div>
      `,
    }).catch(mailError => {
      // Background logging block so backend app never locks up or triggers timeout matrices
      console.warn('Background alert dispatch broadcast warning context layer: ', mailError.message);
    });

    return newInquiry;
  }

  async sendResolutionEmail(data: any) {
    await this.emailTransporter.sendMail({
      from: '"SBS Corporate Support Systems" <info@sbsgroups.co.in>',
      to: data.email,
      subject: 'Resolution: Response Compiled Regarding Your Query',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #334155;">
          <p>Our infrastructure management desk has successfully appended a resolution node to your inquiry:</p>
          <blockquote style="background: #f8fafc; padding: 10px;">"${data.question}"</blockquote>
          <p><b>Resolution Body:</b> ${data.replyText}</p>
        </div>
      `,
    });

    return (this.prisma as any).userSubmittedQuestion.update({
      where: { id: data.id },
      data: { isAnswered: true },
    });
  }

  async deleteFaq(id: string) {
    return this.prisma.faqItem.delete({
      where: { id },
    });
  }
}