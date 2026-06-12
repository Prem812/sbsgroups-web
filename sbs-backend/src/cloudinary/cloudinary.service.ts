import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  
  async uploadAndCompressFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    const fileMime = file.mimetype;
    const fileSizeInBytes = file.size;

    // 1. IMAGE CONDITIONS: Max 200KB, Automatic Compression + WebP Conversion
    if (fileMime.startsWith('image/')) {
      if (fileSizeInBytes > 200 * 1024) {
        throw new BadRequestException('Image size matrix exceeded! Maximum permissible allowance is 200KB.');
      }
      
      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'sbs-faq/images',
            format: 'webp',          // Automatic high-fidelity conversion to WebP format
            quality: 'auto:good',    // Core server-level compression pipeline optimization
            transformation: [{ width: 1200, crop: 'limit' }] // Max resolution safeguard bounds
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Cloudinary response chunk was undefined.')); // 🔥 TS SAFEGUARD FIX
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    }

    // 2. PDF CONDITIONS: Max 5MB
    if (fileMime === 'application/pdf') {
      if (fileSizeInBytes > 5 * 1024 * 1024) {
        throw new BadRequestException('Document overflow! PDF files cannot exceed 5MB boundaries.');
      }

      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'sbs-faq/documents',
            resource_type: 'raw', // Critical parameter for PDFs/non-media files
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Cloudinary raw upload response was undefined.')); // 🔥 TS SAFEGUARD FIX
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    }

    // 3. VIDEO CONDITIONS: Max 5MB + Server level compression transformation
    if (fileMime.startsWith('video/')) {
      if (fileSizeInBytes > 5 * 1024 * 1024) {
        throw new BadRequestException('Media buffer overflow! Video assets must be under 5MB.');
      }

      return new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'sbs-faq/videos',
            resource_type: 'video',
            video_codec: 'h264',       // Standard compress codec stream
            quality: 'auto:low',       // Aggressive cellular-level compression saving storage
          },
          (error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error('Cloudinary video upload response was undefined.')); // 🔥 TS SAFEGUARD FIX
            resolve(result);
          },
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    }

    throw new BadRequestException('Unsupported streaming asset type format provided.');
  }
}