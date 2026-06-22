import {
  Controller, Get, Post, Delete, Put,
  Body, Param, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { KrsService } from './krs.service';
import { PilihKrsDto, ApprovalKrsDto } from './dto/krs.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('KRS')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class KrsController {
  constructor(private readonly service: KrsService) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  @Get('mahasiswa/krs/status')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Status KRS aktif + sisa SKS (Mahasiswa)' })
  async getStatus(@GetUser('mahasiswa') mahasiswa: { nim: string }) {
    return { message: 'Status KRS', data: await this.service.getStatus(mahasiswa.nim) };
  }

  @Get('mahasiswa/krs/matakuliah-tersedia')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'List jadwal yang tersedia di semester aktif (Mahasiswa)' })
  @ApiQuery({ name: 'tahunAkademik', example: '2025/2026' })
  @ApiQuery({ name: 'semesterTipe', enum: ['GANJIL', 'GENAP'] })
  async getMatakuliahTersedia(
    @Query('tahunAkademik') tahunAkademik: string,
    @Query('semesterTipe') semesterTipe: string,
  ) {
    return {
      message: 'Daftar matakuliah tersedia',
      data: await this.service.getMatakuliahTersedia(tahunAkademik, semesterTipe),
    };
  }

  @Post('mahasiswa/krs/pilih')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Ajukan pilihan KRS (Mahasiswa)' })
  async pilihKrs(
    @GetUser('mahasiswa') mahasiswa: { nim: string },
    @Body() dto: PilihKrsDto,
  ) {
    return {
      message: 'KRS berhasil diajukan',
      data: await this.service.pilihKrs(mahasiswa.nim, dto),
    };
  }

  @Delete('mahasiswa/krs/batal/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Batalkan KRS yang belum disetujui (Mahasiswa)' })
  async batalKrs(
    @GetUser('mahasiswa') mahasiswa: { nim: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.service.batalKrs(mahasiswa.nim, id);
    return { message: 'KRS berhasil dibatalkan', data: null };
  }

  // ── ADMIN / DOSEN ──────────────────────────────────────────────────────────

  @Get('admin/krs/rekap')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Statistik pengisian KRS (Admin/Dosen)' })
  async getRekapKrs() {
    return { message: 'Rekap KRS', data: await this.service.getRekapKrs() };
  }

  @Get('admin/krs/mahasiswa/:nim')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'KRS milik mahasiswa tertentu (Admin/Dosen)' })
  async getKrsByMahasiswa(@Param('nim') nim: string) {
    return { message: 'KRS mahasiswa', data: await this.service.getKrsByMahasiswa(nim) };
  }

  @Put('admin/krs/:id/approval')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Setujui atau tolak KRS (Admin/Dosen)' })
  async approvalKrs(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ApprovalKrsDto,
  ) {
    return { message: 'Status KRS diperbarui', data: await this.service.approvalKrs(id, dto) };
  }
}
