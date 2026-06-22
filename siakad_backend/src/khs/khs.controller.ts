import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { KhsService } from './khs.service';
import { InputKolektifDto } from './dto/khs.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('KHS & Transkrip')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class KhsController {
  constructor(private readonly service: KhsService) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  @Get('mahasiswa/khs')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Nilai semester + IPS (cek pembayaran dulu) (Mahasiswa)' })
  @ApiQuery({ name: 'tahun_akademik', example: '2025/2026' })
  @ApiQuery({ name: 'semester', example: 'GANJIL' })
  async getKhsSemester(
    @GetUser('mahasiswa') mahasiswa: { nim: string },
    @Query('tahun_akademik') tahunAkademik: string,
    @Query('semester') semester: string,
  ) {
    return {
      message: 'KHS semester',
      data: await this.service.getKhsSemester(mahasiswa.nim, tahunAkademik, semester),
    };
  }

  @Get('mahasiswa/transkrip')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Transkrip nilai + IPK (Mahasiswa)' })
  async getTranskrip(@GetUser('mahasiswa') mahasiswa: { nim: string }) {
    return { message: 'Transkrip nilai', data: await this.service.getTranskrip(mahasiswa.nim) };
  }

  // ── ADMIN / DOSEN ──────────────────────────────────────────────────────────

  @Get('admin/kelas/:jadwalId/mahasiswa')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'List mahasiswa per kelas untuk input nilai (Admin/Dosen)' })
  async getMahasiswaByJadwal(@Param('jadwalId', ParseIntPipe) jadwalId: number) {
    return { message: 'Daftar mahasiswa kelas', data: await this.service.getMahasiswaByJadwal(jadwalId) };
  }

  @Post('admin/nilai/input-kolektif')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DOSEN)
  @ApiOperation({ summary: 'Input nilai kolektif per kelas (Admin/Dosen)' })
  async inputKolektif(@Body() dto: InputKolektifDto) {
    return { message: 'Nilai berhasil diinput', data: await this.service.inputKolektif(dto) };
  }
}
