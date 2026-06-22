import { Module } from '@nestjs/common';
import { PengumumanController } from './pengumuman.controller';
import { PengumumanService } from './pengumuman.service';
import { CloudinaryService } from './cloudinary.service';
import { FirebaseService } from './firebase.service';

@Module({
  controllers: [PengumumanController],
  providers: [PengumumanService, CloudinaryService, FirebaseService],
})
export class PengumumanModule {}
