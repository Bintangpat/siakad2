import { Module } from '@nestjs/common';
import { KrsController } from './krs.controller';
import { KrsService } from './krs.service';
import { JadwalModule } from '../jadwal/jadwal.module';

@Module({
  imports: [JadwalModule],
  controllers: [KrsController],
  providers: [KrsService],
})
export class KrsModule {}
