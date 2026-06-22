import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    originalName: string,
    folder = 'siakad/pengumuman',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const publicId = `${Date.now()}_${originalName.replace(/\.[^/.]+$/, '')}`;

      cloudinary.uploader.upload_stream(
        { folder, public_id: publicId, resource_type: 'auto' },
        (error, result) => {
          if (error) {
            this.logger.error('Cloudinary upload gagal:', error);
            return reject(new Error('Upload file gagal'));
          }
          resolve(result!.secure_url);
        },
      ).end(fileBuffer);
    });
  }

  async deleteFile(url: string): Promise<void> {
    try {
      // Ekstrak public_id dari URL Cloudinary
      const parts = url.split('/');
      const filename = parts[parts.length - 1].split('.')[0];
      const folder = parts[parts.length - 2];
      await cloudinary.uploader.destroy(`${folder}/${filename}`);
    } catch (err) {
      this.logger.error('Cloudinary delete gagal:', err);
    }
  }
}
