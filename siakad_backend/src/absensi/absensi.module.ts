import { Module } from '@nestjs/common';
import { AbsensiController } from './absensi.controller';
import { AbsensiService } from './absensi.service';
import { AbsensiGateway } from './absensi.gateway';

@Module({
  controllers: [AbsensiController],
  providers: [AbsensiService, AbsensiGateway],
})
export class AbsensiModule {}
