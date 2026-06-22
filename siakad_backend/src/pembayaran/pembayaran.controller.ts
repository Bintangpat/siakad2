import {
  Controller, Get, Post, Body, Param, Query,
  ParseIntPipe, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PembayaranService } from './pembayaran.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role, SemesterTipe } from '../generated/prisma/client';

@ApiTags('Pembayaran')
@Controller()
export class PembayaranController {
  constructor(private readonly service: PembayaranService) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  @Get('mahasiswa/tagihan/aktif')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Tagihan aktif mahasiswa (Mahasiswa)' })
  async getTagihanAktif(@GetUser('mahasiswa') mahasiswa: { nim: string }) {
    return { message: 'Tagihan aktif', data: await this.service.getTagihanAktif(mahasiswa.nim) };
  }

  @Post('mahasiswa/tagihan/:id/request-va')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.MAHASISWA)
  @ApiOperation({ summary: 'Request Virtual Account untuk pembayaran (Mahasiswa)' })
  async requestVa(
    @GetUser('mahasiswa') mahasiswa: { nim: string },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      message: 'Virtual Account berhasil dibuat',
      data: await this.service.requestVirtualAccount(mahasiswa.nim, id),
    };
  }

  // ── ADMIN / KEUANGAN ───────────────────────────────────────────────────────

  @Get('admin/keuangan/rekap-tagihan')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.KEUANGAN)
  @ApiOperation({ summary: 'Rekap tagihan mahasiswa (Admin/Keuangan)' })
  @ApiQuery({ name: 'angkatan', required: false })
  @ApiQuery({ name: 'semesterTipe', required: false, enum: SemesterTipe })
  async getRekapTagihan(
    @Query('angkatan') angkatan?: number,
    @Query('semesterTipe') semesterTipe?: SemesterTipe,
  ) {
    return {
      message: 'Rekap tagihan',
      data: await this.service.getRekapTagihan(angkatan ? Number(angkatan) : undefined, semesterTipe),
    };
  }

  // PUBLIC endpoint untuk webhook dari Payment Gateway
  @Post('admin/keuangan/webhook-callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Webhook callback dari Payment Gateway (Public)' })
  async webhookCallback(@Body() payload: Record<string, any>) {
    await this.service.handleWebhookCallback(payload);
    return { message: 'OK', data: null };
  }
}
