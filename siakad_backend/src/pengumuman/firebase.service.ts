import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert } from 'firebase-admin';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private app: any = null;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    try {
      const projectId = this.config.get('FIREBASE_PROJECT_ID');
      const clientEmail = this.config.get('FIREBASE_CLIENT_EMAIL');
      const privateKey = this.config
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n');

      if (!projectId || !clientEmail || !privateKey) {
        this.logger.warn(
          'Firebase credentials belum dikonfigurasi — push notification dinonaktifkan',
        );
        return;
      }

      this.app = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });

      this.logger.log('Firebase Admin SDK initialized');
    } catch (err) {
      this.logger.error('Gagal inisialisasi Firebase:', err);
    }
  }

  async sendToTopic(
    topic: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    if (!this.app) {
      this.logger.warn('Firebase tidak aktif — notifikasi dilewati');
      return;
    }

    try {
      await getMessaging(this.app).send({
        topic,
        notification: { title, body },
        data,
        android: { priority: 'high' },
        apns: { payload: { aps: { contentAvailable: true } } },
      });
      this.logger.log(`Push notification dikirim ke topic: ${topic}`);
    } catch (err) {
      this.logger.error('Gagal mengirim push notification:', err);
    }
  }
}
