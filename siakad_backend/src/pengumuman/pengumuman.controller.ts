import {
  Controller, Get, Post, Delete, Body, Param, ParseIntPipe,
  UseGuards, UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PengumumanService } from './pengumuman.service';
import { CreatePengumumanDto } from './dto/pengumuman.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('Pengumuman')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class PengumumanController {
  constructor(private readonly service: PengumumanService) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  @Get('mahasiswa/pengumuman')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'List pengumuman untuk mahasiswa (Mahasiswa)' })
  async findAllMahasiswa(@GetUser() user: any) {
    const angkatan = user.mahasiswa?.angkatan;
    return {
      message: 'Daftar pengumuman',
      data: await this.service.findAll('MAHASISWA', angkatan),
    };
  }

  @Get('mahasiswa/pengumuman/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Detail pengumuman (Mahasiswa)' })
  async findOneMahasiswa(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: any,
  ) {
    const angkatan = user.mahasiswa?.angkatan;
    return {
      message: 'Detail pengumuman',
      data: await this.service.findOne(id, 'MAHASISWA', angkatan),
    };
  }

  // ── ADMIN ──────────────────────────────────────────────────────────────────

  @Get('admin/pengumuman')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List semua pengumuman (Admin)' })
  async findAll() {
    return { message: 'Daftar pengumuman', data: await this.service.findAll('ADMIN') };
  }

  @Post('admin/pengumuman')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Buat pengumuman baru + upload lampiran (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        judul: { type: 'string' },
        konten: { type: 'string' },
        targetAudien: { type: 'string', enum: ['SEMUA', 'MAHASISWA', 'DOSEN'] },
        targetAngkatan: { type: 'number' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
    fileFilter: (_, file, cb) => {
      const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
      cb(null, allowed.includes(file.mimetype));
    },
  }))
  async create(
    @GetUser('id') authorId: number,
    @Body() dto: CreatePengumumanDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return {
      message: 'Pengumuman berhasil dibuat',
      data: await this.service.create(authorId, dto, file),
    };
  }

  @Delete('admin/pengumuman/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Hapus pengumuman (Admin)' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
    return { message: 'Pengumuman berhasil dihapus', data: null };
  }
}
