import {
  Injectable, NotFoundException, BadRequestException, ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JadwalService } from '../jadwal/jadwal.service';
import { PilihKrsDto, ApprovalKrsDto } from './dto/krs.dto';

// Aturan batas SKS berdasarkan IPK
const getBatasSks = (ipk: number): number => {
  if (ipk >= 3.0) return 24;
  if (ipk >= 2.5) return 21;
  if (ipk >= 2.0) return 18;
  return 15;
};

@Injectable()
export class KrsService {
  constructor(
    private prisma: PrismaService,
    private jadwalService: JadwalService,
  ) {}

  // ── MAHASISWA ──────────────────────────────────────────────────────────────

  async getStatus(nim: string) {
    const mahasiswa = await this.prisma.mahasiswa.findUnique({
      where: { nim },
      include: {
        krs: {
          include: {
            jadwal: { include: { mataKuliah: true } },
          },
        },
      },
    });
    if (!mahasiswa) throw new NotFoundException('Mahasiswa tidak ditemukan');

    const totalSksAmbil = mahasiswa.krs.reduce(
      (sum, k) => sum + k.jadwal.mataKuliah.sks, 0,
    );

    // Hitung IPK dari KHS
    const khs = await this.prisma.khs.findMany({
      where: { nim },
      include: { jadwal: { include: { mataKuliah: true } } },
    });
    let totalBobot = 0, totalSks = 0;
    for (const k of khs) {
      const sks = k.jadwal.mataKuliah.sks;
      const bobot = k.nilaiHurufId ? Number((await this.prisma.skalaNilai.findUnique({ where: { nilaiHuruf: k.nilaiHurufId } }))?.bobotIndeks ?? 0) : 0;
      totalBobot += sks * bobot;
      totalSks += sks;
    }
    const ipk = totalSks > 0 ? totalBobot / totalSks : 0;
    const batasSks = getBatasSks(ipk);

    const statusPengisian =
      mahasiswa.krs.length === 0 ? 'BELUM_ISI'
      : mahasiswa.krs.some(k => k.statusApproval === 'PENDING') ? 'MENUNGGU_PERSETUJUAN'
      : 'DISETUJUI';

    return {
      nim,
      statusPengisian,
      ipk: Math.round(ipk * 100) / 100,
      batasSks,
      sksAmbil: totalSksAmbil,
      sisaSks: batasSks - totalSksAmbil,
      daftarKrs: mahasiswa.krs,
    };
  }

  async getMatakuliahTersedia(tahunAkademik: string, semesterTipe: string) {
    return this.jadwalService.findAll(tahunAkademik, semesterTipe as any);
  }

  async pilihKrs(nim: string, dto: PilihKrsDto) {
    // 1. Validasi bentrok jam
    const { bentrok, detail } = await this.jadwalService.checkBentrok(dto.jadwalIds);
    if (bentrok) {
      throw new BadRequestException({ message: 'Terdapat bentrok jadwal', detail });
    }

    // 2. Validasi kuota dan tidak duplikat
    const results: any[] = [];
    for (const jadwalId of dto.jadwalIds) {
      const jadwal = await this.prisma.jadwalKuliah.findUnique({
        where: { id: jadwalId },
        include: { _count: { select: { krs: true } } },
      });
      if (!jadwal) throw new NotFoundException(`Jadwal #${jadwalId} tidak ditemukan`);
      if (jadwal._count.krs >= jadwal.kuota) {
        throw new BadRequestException(`Kuota kelas jadwal #${jadwalId} sudah penuh`);
      }

      const existing = await this.prisma.krs.findUnique({
        where: { nim_jadwalId: { nim, jadwalId } },
      });
      if (existing) continue; // Skip yang sudah ada

      const krs = await this.prisma.krs.create({
        data: { nim, jadwalId, statusApproval: 'PENDING' },
        include: { jadwal: { include: { mataKuliah: true } } },
      });
      results.push(krs);
    }

    return results;
  }

  async batalKrs(nim: string, krsId: number) {
    const krs = await this.prisma.krs.findFirst({
      where: { id: krsId, nim },
    });
    if (!krs) throw new NotFoundException('KRS tidak ditemukan');
    if (krs.statusApproval === 'DISETUJUI') {
      throw new ForbiddenException('KRS yang sudah disetujui tidak dapat dibatalkan');
    }
    return this.prisma.krs.delete({ where: { id: krsId } });
  }

  // ── ADMIN ──────────────────────────────────────────────────────────────────

  async getRekapKrs() {
    const [totalAktif, sudahIsi, pending] = await Promise.all([
      this.prisma.mahasiswa.count({ where: { statusAkademik: 'AKTIF' } }),
      this.prisma.krs.groupBy({
        by: ['nim'],
        _count: true,
      }).then(r => r.length),
      this.prisma.krs.count({ where: { statusApproval: 'PENDING' } }),
    ]);

    return {
      totalMahasiswaAktif: totalAktif,
      sudahMengisiKrs: sudahIsi,
      belumMengisiKrs: totalAktif - sudahIsi,
      menungguPersetujuan: pending,
    };
  }

  async approvalKrs(krsId: number, dto: ApprovalKrsDto) {
    const krs = await this.prisma.krs.findUnique({ where: { id: krsId } });
    if (!krs) throw new NotFoundException('KRS tidak ditemukan');
    return this.prisma.krs.update({
      where: { id: krsId },
      data: {
        statusApproval: dto.statusApproval,
        catatanDosen: dto.catatanDosen,
      },
    });
  }

  async getKrsByMahasiswa(nim: string) {
    return this.prisma.krs.findMany({
      where: { nim },
      include: {
        jadwal: {
          include: { mataKuliah: true, dosen: { include: { user: true } } },
        },
      },
    });
  }
}
