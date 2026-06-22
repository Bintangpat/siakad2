import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from './cloudinary.service';
import { FirebaseService } from './firebase.service';
import { CreatePengumumanDto } from './dto/pengumuman.dto';
import { TargetAudien } from '../generated/prisma/client';

@Injectable()
export class PengumumanService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
    private firebase: FirebaseService,
  ) {}

  async findAll(userRole: string, angkatan?: number) {
    const where: any = {};

    // Filter target audien berdasarkan role
    if (userRole === 'MAHASISWA') {
      where.OR = [
        { targetAudien: TargetAudien.SEMUA },
        { targetAudien: TargetAudien.MAHASISWA },
      ];
      if (angkatan) {
        where.AND = [
          { OR: where.OR },
          { OR: [{ targetAngkatan: null }, { targetAngkatan: angkatan }] },
        ];
        delete where.OR;
      }
    } else if (userRole === 'DOSEN') {
      where.OR = [
        { targetAudien: TargetAudien.SEMUA },
        { targetAudien: TargetAudien.DOSEN },
      ];
    }

    return this.prisma.pengumuman.findMany({
      where,
      include: { author: { select: { namaLengkap: true, role: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userRole: string, angkatan?: number) {
    const pengumuman = await this.prisma.pengumuman.findUnique({
      where: { id },
      include: { author: { select: { namaLengkap: true, role: true } } },
    });
    if (!pengumuman) throw new NotFoundException('Pengumuman tidak ditemukan');

    // Validasi akses berdasarkan target audien
    if (userRole === 'MAHASISWA') {
      const notForMahasiswa =
        pengumuman.targetAudien === TargetAudien.DOSEN;
      const wrongAngkatan =
        pengumuman.targetAngkatan && angkatan && pengumuman.targetAngkatan !== angkatan;
      if (notForMahasiswa || wrongAngkatan) {
        throw new NotFoundException('Pengumuman tidak ditemukan');
      }
    }

    return pengumuman;
  }

  async create(
    authorId: number,
    dto: CreatePengumumanDto,
    file?: Express.Multer.File,
  ) {
    let fileLampiran: string | undefined;

    if (file) {
      fileLampiran = await this.cloudinary.uploadFile(file.buffer, file.originalname);
    }

    const pengumuman = await this.prisma.pengumuman.create({
      data: {
        authorId,
        judul: dto.judul,
        konten: dto.konten,
        targetAudien: dto.targetAudien ?? TargetAudien.SEMUA,
        targetAngkatan: dto.targetAngkatan,
        fileLampiran,
      },
      include: { author: { select: { namaLengkap: true } } },
    });

    // Kirim push notification secara async (non-blocking)
    const topic = dto.targetAudien === TargetAudien.DOSEN ? 'dosen' :
                  dto.targetAudien === TargetAudien.MAHASISWA ? 'mahasiswa' : 'semua';

    this.firebase.sendToTopic(
      topic,
      `📢 ${dto.judul}`,
      dto.konten.substring(0, 100) + (dto.konten.length > 100 ? '...' : ''),
      { pengumumanId: String(pengumuman.id) },
    ).catch(() => {}); // Ignore notification failure silently

    return pengumuman;
  }

  async remove(id: number) {
    const pengumuman = await this.prisma.pengumuman.findUnique({ where: { id } });
    if (!pengumuman) throw new NotFoundException('Pengumuman tidak ditemukan');

    // Hapus file dari Cloudinary jika ada
    if (pengumuman.fileLampiran) {
      await this.cloudinary.deleteFile(pengumuman.fileLampiran);
    }

    return this.prisma.pengumuman.delete({ where: { id } });
  }
}
