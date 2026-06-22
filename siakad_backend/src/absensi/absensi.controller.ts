import {
  Controller, Get, Post, Put, Body, Param,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AbsensiService } from './absensi.service';
import { BukaSesiDto, ScanQrDto, UbahStatusAbsensiDto } from './dto/absensi.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('Absensi')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class AbsensiController {
  constructor(private readonly service: AbsensiService) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  @Get('mahasiswa/absensi/rekap')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Rekap % kehadiran per matakuliah (Mahasiswa)' })
  async getRekapAbsensi(@GetUser('mahasiswa') mahasiswa: { nim: string }) {
    return { message: 'Rekap absensi', data: await this.service.getRekapAbsensi(mahasiswa.nim) };
  }

  @Post('mahasiswa/absensi/scan')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Scan QR Code untuk presensi (Mahasiswa)' })
  async scanQr(
    @GetUser('mahasiswa') mahasiswa: { nim: string },
    @Body() dto: ScanQrDto,
  ) {
    return {
      message: 'Presensi berhasil dicatat',
      data: await this.service.scanQr(mahasiswa.nim, dto),
    };
  }

  // ── ADMIN / DOSEN ──────────────────────────────────────────────────────────

  @Post('admin/absensi/sesi/buka')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Buka sesi kelas + generate QR Code (Admin/Dosen)' })
  async bukaSesi(@Body() dto: BukaSesiDto) {
    return { message: 'Sesi berhasil dibuka', data: await this.service.bukaSesi(dto) };
  }

  @Get('admin/absensi/sesi/:sesiId/realtime')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Data presensi real-time sesi (HTTP snapshot — WebSocket: /absensi)' })
  async getRealtimeSesi(@Param('sesiId', ParseIntPipe) sesiId: number) {
    return { message: 'Data absensi sesi', data: await this.service.getRealtimeSesi(sesiId) };
  }

  @Put('admin/absensi/sesi/:sesiId/tutup')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Tutup sesi kelas (Admin/Dosen)' })
  async tutupSesi(@Param('sesiId', ParseIntPipe) sesiId: number) {
    return { message: 'Sesi berhasil ditutup', data: await this.service.tutupSesi(sesiId) };
  }

  @Put('admin/absensi/mahasiswa/ubah-status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Ubah status absensi manual (Admin/Dosen)' })
  async ubahStatus(@Body() dto: UbahStatusAbsensiDto) {
    return { message: 'Status absensi diperbarui', data: await this.service.ubahStatusAbsensi(dto) };
  }
}
