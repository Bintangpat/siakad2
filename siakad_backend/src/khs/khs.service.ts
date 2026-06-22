import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InputKolektifDto } from './dto/khs.dto';

@Injectable()
export class KhsService {
  constructor(private prisma: PrismaService) {}

  // Hitung nilai angka dari komponen
  private hitungNilaiAngka(tugas: number, uts: number, uas: number, presensi: number): number {
    return (tugas * 0.2) + (uts * 0.3) + (uas * 0.4) + (presensi * 0.1);
  }

  // Tentukan nilaiHuruf berdasarkan SkalaNilai dari database
  private async getNilaiHuruf(nilaiAngka: number): Promise<string | null> {
    const skala = await this.prisma.skalaNilai.findFirst({
      where: {
        nilaiMinimal: { lte: nilaiAngka },
        nilaiMaksimal: { gte: nilaiAngka },
      },
    });
    return skala?.nilaiHuruf ?? null;
  }

  // Hitung IPS untuk satu semester
  private async hitungIps(khs: any[]): Promise<number> {
    let totalBobot = 0, totalSks = 0;
    for (const k of khs) {
      if (k.nilaiHurufId) {
        const skala = await this.prisma.skalaNilai.findUnique({
          where: { nilaiHuruf: k.nilaiHurufId },
        });
        if (skala) {
          const sks = k.jadwal.mataKuliah.sks;
          totalBobot += sks * Number(skala.bobotIndeks);
          totalSks += sks;
        }
      }
    }
    return totalSks > 0 ? Math.round((totalBobot / totalSks) * 100) / 100 : 0;
  }

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  async getKhsSemester(nim: string, tahunAkademik: string, semesterTipe: string) {
    // Cek status pembayaran terlebih dahulu
    const tagihan = await this.prisma.tagihanPembayaran.findFirst({
      where: { nim, tahunAkademik, semesterTipe: semesterTipe as any, statusBayar: 'LUNAS' },
    });
    if (!tagihan) {
      throw new ForbiddenException('Akses KHS ditolak: tagihan semester ini belum lunas');
    }

    const khs = await this.prisma.khs.findMany({
      where: {
        nim,
        jadwal: { tahunAkademik, semesterTipe: semesterTipe as any },
      },
      include: {
        jadwal: { include: { mataKuliah: true } },
        skalaNilai: true,
      },
    });

    const ips = await this.hitungIps(khs);
    return { tahunAkademik, semesterTipe, ips, nilaiList: khs };
  }

  async getTranskrip(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findUnique({ where: { nim } });
    if (!mahasiswa) throw new NotFoundException('Mahasiswa tidak ditemukan');

    const khs = await this.prisma.khs.findMany({
      where: { nim },
      include: {
        jadwal: { include: { mataKuliah: true } },
        skalaNilai: true,
      },
      orderBy: { jadwal: { tahunAkademik: 'asc' } },
    });

    // Hitung IPK dari semua semester
    let totalBobot = 0, totalSks = 0;
    for (const k of khs) {
      if (k.nilaiHurufId && k.skalaNilai) {
        const sks = k.jadwal.mataKuliah.sks;
        totalBobot += sks * Number(k.skalaNilai.bobotIndeks);
        totalSks += sks;
      }
    }
    const ipk = totalSks > 0 ? Math.round((totalBobot / totalSks) * 100) / 100 : 0;

    return { nim, ipk, totalSks, nilaiList: khs };
  }

  // ── ADMIN / DOSEN ──────────────────────────────────────────────────────────

  async getMahasiswaByJadwal(jadwalId: number) {
    const jadwal = await this.prisma.jadwalKuliah.findUnique({
      where: { id: jadwalId },
      include: { mataKuliah: true },
    });
    if (!jadwal) throw new NotFoundException(`Jadwal #${jadwalId} tidak ditemukan`);

    const krs = await this.prisma.krs.findMany({
      where: { jadwalId, statusApproval: 'DISETUJUI' },
      include: {
        mahasiswa: { include: { user: { select: { namaLengkap: true } } } },
        jadwal: true,
      },
    });

    // Gabungkan dengan data KHS yang sudah ada
    const result = await Promise.all(krs.map(async (k) => {
      const khs = await this.prisma.khs.findUnique({
        where: { nim_jadwalId: { nim: k.nim, jadwalId } },
        include: { skalaNilai: true },
      });
      return { ...k, khs };
    }));

    return { jadwal, mahasiswaList: result };
  }

  async inputKolektif(dto: InputKolektifDto) {
    const jadwal = await this.prisma.jadwalKuliah.findUnique({ where: { id: dto.jadwalId } });
    if (!jadwal) throw new NotFoundException('Jadwal tidak ditemukan');

    const results: any[] = [];
    for (const item of dto.nilaiData) {
      const nilaiAngka = this.hitungNilaiAngka(item.tugas, item.uts, item.uas, item.presensi);
      const nilaiHuruf = await this.getNilaiHuruf(nilaiAngka);

      const khs = await this.prisma.khs.upsert({
        where: { nim_jadwalId: { nim: item.nim, jadwalId: dto.jadwalId } },
        update: {
          nilaiTugas: item.tugas,
          nilaiUts: item.uts,
          nilaiUas: item.uas,
          nilaiPresensi: item.presensi,
          nilaiAngka,
          nilaiHurufId: nilaiHuruf,
        },
        create: {
          nim: item.nim,
          jadwalId: dto.jadwalId,
          nilaiTugas: item.tugas,
          nilaiUts: item.uts,
          nilaiUas: item.uas,
          nilaiPresensi: item.presensi,
          nilaiAngka,
          nilaiHurufId: nilaiHuruf,
        },
        include: { skalaNilai: true },
      });
      results.push(khs);
    }

    return results;
  }
}
