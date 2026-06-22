import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MataKuliahService } from './mata-kuliah.service';
import { CreateMataKuliahDto, UpdateMataKuliahDto } from './dto/mata-kuliah.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('Mata Kuliah')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class MataKuliahController {
  constructor(private readonly service: MataKuliahService) {}

  @Get('admin/mata-kuliah')
  @ApiOperation({ summary: 'List semua mata kuliah' })
  async findAll() {
    return { message: 'Daftar mata kuliah', data: await this.service.findAll() };
  }

  @Get('admin/mata-kuliah/:kodeMk')
  @ApiOperation({ summary: 'Detail mata kuliah' })
  async findOne(@Param('kodeMk') kodeMk: string) {
    return { message: 'Detail mata kuliah', data: await this.service.findOne(kodeMk) };
  }

  @Post('admin/mata-kuliah')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Buat mata kuliah baru (Admin)' })
  async create(@Body() dto: CreateMataKuliahDto) {
    return { message: 'Mata kuliah berhasil dibuat', data: await this.service.create(dto) };
  }

  @Put('admin/mata-kuliah/:kodeMk')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update mata kuliah (Admin)' })
  async update(@Param('kodeMk') kodeMk: string, @Body() dto: UpdateMataKuliahDto) {
    return { message: 'Mata kuliah berhasil diupdate', data: await this.service.update(kodeMk, dto) };
  }

  @Delete('admin/mata-kuliah/:kodeMk')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Hapus mata kuliah (Admin)' })
  async remove(@Param('kodeMk') kodeMk: string) {
    await this.service.remove(kodeMk);
    return { message: 'Mata kuliah berhasil dihapus', data: null };
  }
}
