import {
  Injectable, NotFoundException, BadRequestException, ForbiddenException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { AbsensiGateway } from './absensi.gateway';
import { BukaSesiDto, ScanQrDto, UbahStatusAbsensiDto } from './dto/absensi.dto';

const QR_TOKEN_EXPIRY_MINUTES = 5; // QR expired setelah 5 menit

@Injectable()
export class AbsensiService {
  constructor(
    private prisma: PrismaService,
    private gateway: AbsensiGateway,
  ) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  async getRekapAbsensi(nim: string) {
    // Cari semua jadwal yang diambil mahasiswa (KRS disetujui)
    const krs = await this.prisma.krs.findMany({
      where: { nim, statusApproval: 'DISETUJUI' },
      include: {
        jadwal: {
          include: {
            mataKuliah: true,
            sesiPertemuan: {
              include: { absensi: { where: { nim } } },
            },
          },
        },
      },
    });

    return krs.map(k => {
      const totalSesi = k.jadwal.sesiPertemuan.length;
      const hadirCount = k.jadwal.sesiPertemuan.filter(s =>
        s.absensi.some(a => a.statusKehadiran === 'HADIR'),
      ).length;
      const persentase = totalSesi > 0 ? Math.round((hadirCount / totalSesi) * 100) : 0;

      return {
        mataKuliah: k.jadwal.mataKuliah.namaMk,
        kodeMk: k.jadwal.mataKuliah.kodeMk,
        totalPertemuan: totalSesi,
        hadir: hadirCount,
        persentaseKehadiran: persentase,
        memenuhiSyaratUas: persentase >= 75,
      };
    });
  }

  async scanQr(nim: string, dto: ScanQrDto) {
    const sesi = await this.prisma.sesiPertemuan.findUnique({
      where: { id: dto.sesiId },
      include: { jadwal: { include: { mataKuliah: true } } },
    });

    if (!sesi) throw new NotFoundException('Sesi tidak ditemukan');
    if (sesi.statusSesi !== 'DIBUKA') {
      throw new ForbiddenException('Sesi presensi tidak dalam kondisi DIBUKA');
    }
    if (sesi.qrCodeToken !== dto.qrToken) {
      throw new BadRequestException('QR Token tidak valid');
    }
    if (sesi.tokenExpiresAt && new Date() > sesi.tokenExpiresAt) {
      throw new BadRequestException('QR Token sudah kadaluarsa');
    }

    // Upsert absensi (update jika sudah ada)
    const absensi = await this.prisma.absensiMahasiswa.upsert({
      where: { sesiId_nim: { sesiId: dto.sesiId, nim } },
      update: { statusKehadiran: 'HADIR', waktuPresensi: new Date() },
      create: {
        sesiId: dto.sesiId,
        nim,
        statusKehadiran: 'HADIR',
        waktuPresensi: new Date(),
      },
      include: { mahasiswa: { include: { user: { select: { namaLengkap: true } } } } },
    });

    // Emit ke WebSocket real-time
    this.gateway.emitMahasiswaHadir(dto.sesiId, {
      nim,
      namaLengkap: absensi.mahasiswa.user.namaLengkap,
      waktuPresensi: absensi.waktuPresensi!,
      statusKehadiran: absensi.statusKehadiran,
    });

    return absensi;
  }

  // ── ADMIN / DOSEN ──────────────────────────────────────────────────────────

  async bukaSesi(dto: BukaSesiDto) {
    const qrCodeToken = randomUUID().replace(/-/g, '').substring(0, 20);
    const tokenExpiresAt = new Date(Date.now() + QR_TOKEN_EXPIRY_MINUTES * 60 * 1000);

    // Upsert sesi — buat baru atau buka ulang yang ada
    const sesi = await this.prisma.sesiPertemuan.upsert({
      where: { jadwalId_pertemuanKe: { jadwalId: dto.jadwalId, pertemuanKe: dto.pertemuanKe } },
      update: { statusSesi: 'DIBUKA', qrCodeToken, tokenExpiresAt },
      create: {
        jadwalId: dto.jadwalId,
        pertemuanKe: dto.pertemuanKe,
        tanggal: new Date(dto.tanggal),
        statusSesi: 'DIBUKA',
        qrCodeToken,
        tokenExpiresAt,
      },
    });

    // Auto-isi ALFA untuk semua mahasiswa yang mengambil KRS ini
    const krs = await this.prisma.krs.findMany({
      where: { jadwalId: dto.jadwalId, statusApproval: 'DISETUJUI' },
    });
    for (const k of krs) {
      await this.prisma.absensiMahasiswa.upsert({
        where: { sesiId_nim: { sesiId: sesi.id, nim: k.nim } },
        update: {},
        create: { sesiId: sesi.id, nim: k.nim, statusKehadiran: 'ALFA' },
      });
    }

    return {
      sesi,
      qrCodeToken,
      tokenExpiresAt,
      qrPayload: { sesiId: sesi.id, qrToken: qrCodeToken },
    };
  }

  async getRealtimeSesi(sesiId: number) {
    const sesi = await this.prisma.sesiPertemuan.findUnique({
      where: { id: sesiId },
      include: {
        jadwal: { include: { mataKuliah: true } },
        absensi: {
          include: { mahasiswa: { include: { user: { select: { namaLengkap: true } } } } },
          orderBy: { waktuPresensi: 'asc' },
        },
      },
    });
    if (!sesi) throw new NotFoundException('Sesi tidak ditemukan');

    const summary = {
      hadir: sesi.absensi.filter(a => a.statusKehadiran === 'HADIR').length,
      sakit: sesi.absensi.filter(a => a.statusKehadiran === 'SAKIT').length,
      izin: sesi.absensi.filter(a => a.statusKehadiran === 'IZIN').length,
      alfa: sesi.absensi.filter(a => a.statusKehadiran === 'ALFA').length,
      total: sesi.absensi.length,
    };

    return { sesi, summary };
  }

  async tutupSesi(sesiId: number) {
    return this.prisma.sesiPertemuan.update({
      where: { id: sesiId },
      data: { statusSesi: 'DITUTUP', qrCodeToken: null },
    });
  }

  async ubahStatusAbsensi(dto: UbahStatusAbsensiDto) {
    const absensi = await this.prisma.absensiMahasiswa.findUnique({ where: { id: dto.absensiId } });
    if (!absensi) throw new NotFoundException('Data absensi tidak ditemukan');

    return this.prisma.absensiMahasiswa.update({
      where: { id: dto.absensiId },
      data: {
        statusKehadiran: dto.statusKehadiran,
        waktuPresensi: dto.statusKehadiran === 'HADIR' ? new Date() : null,
      },
    });
  }
}
