import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJadwalDto, UpdateJadwalDto } from './dto/jadwal.dto';
import { SemesterTipe } from '../generated/prisma/client';

@Injectable()
export class JadwalService {
  constructor(private prisma: PrismaService) {}

  private jadwalInclude = {
    mataKuliah: true,
    dosen: { include: { user: { select: { namaLengkap: true } } } },
    _count: { select: { krs: true } },
  };

  async findAll(tahunAkademik?: string, semesterTipe?: SemesterTipe) {
    return this.prisma.jadwalKuliah.findMany({
      where: {
        ...(tahunAkademik && { tahunAkademik }),
        ...(semesterTipe && { semesterTipe }),
      },
      include: this.jadwalInclude,
      orderBy: [{ hari: 'asc' }, { jamMulai: 'asc' }],
    });
  }

  async findOne(id: number) {
    const jadwal = await this.prisma.jadwalKuliah.findUnique({
      where: { id },
      include: this.jadwalInclude,
    });
    if (!jadwal) throw new NotFoundException(`Jadwal #${id} tidak ditemukan`);
    return jadwal;
  }

  async create(dto: CreateJadwalDto) {
    return this.prisma.jadwalKuliah.create({
      data: {
        ...dto,
        jamMulai: new Date(dto.jamMulai),
        jamSelesai: new Date(dto.jamSelesai),
      },
      include: this.jadwalInclude,
    });
  }

  async update(id: number, dto: UpdateJadwalDto) {
    await this.findOne(id);
    return this.prisma.jadwalKuliah.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.jamMulai && { jamMulai: new Date(dto.jamMulai) }),
        ...(dto.jamSelesai && { jamSelesai: new Date(dto.jamSelesai) }),
      },
      include: this.jadwalInclude,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.jadwalKuliah.delete({ where: { id } });
  }

  // Cek bentrok jadwal untuk mahasiswa berdasarkan jadwal_ids yang dipilih
  async checkBentrok(jadwalIds: number[]): Promise<{ bentrok: boolean; detail: string[] }> {
    const jadwals = await this.prisma.jadwalKuliah.findMany({
      where: { id: { in: jadwalIds } },
    });

    const conflicts: string[] = [];
    for (let i = 0; i < jadwals.length; i++) {
      for (let j = i + 1; j < jadwals.length; j++) {
        const a = jadwals[i];
        const b = jadwals[j];
        if (a.hari === b.hari) {
          const aStart = a.jamMulai.getTime();
          const aEnd = a.jamSelesai.getTime();
          const bStart = b.jamMulai.getTime();
          const bEnd = b.jamSelesai.getTime();
          if (aStart < bEnd && aEnd > bStart) {
            conflicts.push(`Jadwal #${a.id} (${a.hari}) bentrok dengan Jadwal #${b.id}`);
          }
        }
      }
    }

    return { bentrok: conflicts.length > 0, detail: conflicts };
  }
}
