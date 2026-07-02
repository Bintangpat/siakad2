import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  async sendOtp(email: string, code: string): Promise<void> {
    this.logger.log(`=========================================`);
    this.logger.log(`📧 SENDING EMAIL OTP TO: ${email}`);
    this.logger.log(`🔑 OTP CODE: ${code}`);
    this.logger.log(`=========================================`);

    // Di sini kita dapat menambahkan integrasi Nodemailer / Sendgrid di masa depan.
    // Untuk pengembangan lokal, pencatatan di atas sudah cukup agar developer/user dapat
    // melihat OTP langsung dari log terminal backend.
  }
}
