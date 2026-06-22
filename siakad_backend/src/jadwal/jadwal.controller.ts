import {
  Controller, Get, Post, Put, Delete,
  Body, Param, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JadwalService } from './jadwal.service';
import { CreateJadwalDto, UpdateJadwalDto } from './dto/jadwal.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role, SemesterTipe } from '../generated/prisma/client';

@ApiTags('Jadwal Kuliah')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class JadwalController {
  constructor(private readonly service: JadwalService) {}

  @Get('admin/jadwal')
  @ApiOperation({ summary: 'List jadwal kuliah (Admin)' })
  @ApiQuery({ name: 'tahunAkademik', required: false })
  @ApiQuery({ name: 'semesterTipe', required: false, enum: SemesterTipe })
  async findAll(
    @Query('tahunAkademik') tahunAkademik?: string,
    @Query('semesterTipe') semesterTipe?: SemesterTipe,
  ) {
    return { message: 'Daftar jadwal', data: await this.service.findAll(tahunAkademik, semesterTipe) };
  }

  @Get('admin/jadwal/:id')
  @ApiOperation({ summary: 'Detail jadwal (Admin)' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { message: 'Detail jadwal', data: await this.service.findOne(id) };
  }

  @Post('admin/jadwal')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Buat jadwal baru (Admin)' })
  async create(@Body() dto: CreateJadwalDto) {
    return { message: 'Jadwal berhasil dibuat', data: await this.service.create(dto) };
  }

  @Put('admin/jadwal/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update jadwal / tambah kuota (Admin)' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateJadwalDto) {
    return { message: 'Jadwal berhasil diupdate', data: await this.service.update(id, dto) };
  }

  @Delete('admin/jadwal/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Hapus jadwal (Admin)' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id);
    return { message: 'Jadwal berhasil dihapus', data: null };
  }
}
