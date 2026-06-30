import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

import { MataKuliahModule } from './mata-kuliah/mata-kuliah.module';
import { JadwalModule } from './jadwal/jadwal.module';
import { KrsModule } from './krs/krs.module';
import { KhsModule } from './khs/khs.module';
import { PembayaranModule } from './pembayaran/pembayaran.module';
import { PengumumanModule } from './pengumuman/pengumuman.module';
import { AbsensiModule } from './absensi/absensi.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Global config (loads .env)
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Global Prisma module
    PrismaModule,
    // Feature modules
    AuthModule,
    MataKuliahModule,
    JadwalModule,
    KrsModule,
    KhsModule,
    PembayaranModule,
    PengumumanModule,
    AbsensiModule,
    DashboardModule,
    UsersModule,
  ],
})
export class AppModule {}
