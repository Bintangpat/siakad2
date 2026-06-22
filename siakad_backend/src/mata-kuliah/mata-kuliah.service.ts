import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMataKuliahDto, UpdateMataKuliahDto } from './dto/mata-kuliah.dto';

@Injectable()
export class MataKuliahService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.mataKuliah.findMany({
      include: { _count: { select: { jadwalKuliah: true } } },
      orderBy: { semesterPaket: 'asc' },
    });
  }

  async findOne(kodeMk: string) {
    const mk = await this.prisma.mataKuliah.findUnique({
      where: { kodeMk },
      include: { jadwalKuliah: { include: { dosen: { include: { user: true } } } } },
    });
    if (!mk) throw new NotFoundException(`Mata kuliah ${kodeMk} tidak ditemukan`);
    return mk;
  }

  async create(dto: CreateMataKuliahDto) {
    const exists = await this.prisma.mataKuliah.findUnique({ where: { kodeMk: dto.kodeMk } });
    if (exists) throw new ConflictException(`Kode MK ${dto.kodeMk} sudah ada`);
    return this.prisma.mataKuliah.create({ data: dto });
  }

  async update(kodeMk: string, dto: UpdateMataKuliahDto) {
    await this.findOne(kodeMk);
    return this.prisma.mataKuliah.update({ where: { kodeMk }, data: dto });
  }

  async remove(kodeMk: string) {
    await this.findOne(kodeMk);
    return this.prisma.mataKuliah.delete({ where: { kodeMk } });
  }
}
