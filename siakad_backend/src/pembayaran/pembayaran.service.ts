import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SemesterTipe } from '../generated/prisma/client';

@Injectable()
export class PembayaranService {
  constructor(private prisma: PrismaService) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  async getTagihanAktif(nim: string) {
    const tagihan = await this.prisma.tagihanPembayaran.findMany({
      where: { nim, statusBayar: { in: ['BELUM_DIBAYAR', 'KEDALUWARSA'] } },
      orderBy: { createdAt: 'desc' },
    });
    if (!tagihan.length) {
      return { message: 'Tidak ada tagihan aktif', tagihan: [] };
    }
    return { tagihan };
  }

  async requestVirtualAccount(nim: string, tagihanId: number): Promise<{ vaNumber: string; nominal: number }> {
    const tagihan = await this.prisma.tagihanPembayaran.findFirst({
      where: { id: tagihanId, nim },
    });
    if (!tagihan) throw new NotFoundException('Tagihan tidak ditemukan');

    // ── PAYMENT GATEWAY PLACEHOLDER ──────────────────────────────────────────
    // TODO: Ganti implementasi ini dengan Midtrans / Xendit sesuai kebutuhan
    // Contoh dengan Midtrans:
    //   const snap = new midtransClient.Snap({ serverKey: process.env.MIDTRANS_SERVER_KEY });
    //   const transaction = await snap.createTransaction({ ... });
    //   vaNumber = transaction.va_numbers[0].va_number;
    // ─────────────────────────────────────────────────────────────────────────
    const vaNumber = tagihan.vaNumber || `VAB${String(tagihanId).padStart(10, '0')}`;

    const updated = await this.prisma.tagihanPembayaran.update({
      where: { id: tagihanId },
      data: { vaNumber },
    });

    return { vaNumber: updated.vaNumber, nominal: Number(updated.nominal) };
  }

  // ── ADMIN / KEUANGAN ───────────────────────────────────────────────────────

  async getRekapTagihan(angkatan?: number, semesterTipe?: SemesterTipe) {
    const where: any = {};
    if (semesterTipe) where.semesterTipe = semesterTipe;
    if (angkatan) where.mahasiswa = { angkatan };

    const tagihans = await this.prisma.tagihanPembayaran.findMany({
      where,
      include: {
        mahasiswa: { include: { user: { select: { namaLengkap: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const summary = {
      total: tagihans.length,
      lunas: tagihans.filter(t => t.statusBayar === 'LUNAS').length,
      belumBayar: tagihans.filter(t => t.statusBayar === 'BELUM_DIBAYAR').length,
      kedaluwarsa: tagihans.filter(t => t.statusBayar === 'KEDALUWARSA').length,
    };

    return { summary, tagihans };
  }

  // Webhook callback dari Payment Gateway — mengubah status menjadi LUNAS
  async handleWebhookCallback(payload: Record<string, any>): Promise<void> {
    // ── PAYMENT GATEWAY PLACEHOLDER ──────────────────────────────────────────
    // TODO: Verifikasi signature/token dari payment gateway sebelum update
    // Contoh Midtrans: verifikasi signature dengan SHA512
    // Contoh Xendit: verifikasi header x-callback-token
    // ─────────────────────────────────────────────────────────────────────────

    const vaNumber = payload.va_number || payload.external_id;
    if (!vaNumber) return;

    const tagihan = await this.prisma.tagihanPembayaran.findFirst({
      where: { vaNumber },
    });
    if (!tagihan || tagihan.statusBayar === 'LUNAS') return;

    await this.prisma.tagihanPembayaran.update({
      where: { id: tagihan.id },
      data: { statusBayar: 'LUNAS', waktuBayar: new Date() },
    });
  }

  // Admin: buat tagihan manual
  async createTagihan(nim: string, data: {
    jenisTagihan: string; nominal: number;
    tahunAkademik: string; semesterTipe: SemesterTipe;
  }) {
    const vaNumber = `VA${nim}${Date.now()}`;
    return this.prisma.tagihanPembayaran.create({
      data: { nim, vaNumber, ...data },
    });
  }
}
