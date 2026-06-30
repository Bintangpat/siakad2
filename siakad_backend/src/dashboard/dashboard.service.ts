import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // 1. Total Active Students
    const totalActiveStudents = await this.prisma.mahasiswa.count({
      where: {
        statusAkademik: 'AKTIF',
      },
    });

    // 2. KRS Completion (Students with approved KRS / Total Active Students)
    const krsApprovedCount = await this.prisma.mahasiswa.count({
      where: {
        statusAkademik: 'AKTIF',
        krs: {
          some: {
            statusApproval: 'DISETUJUI',
          }
        }
      },
    });
    const krsCompletionRate = totalActiveStudents > 0 ? Math.round((krsApprovedCount / totalActiveStudents) * 100) : 0;

    // 3. Total Revenue (Assuming from LUNAS tagihan)
    const revenueResult = await this.prisma.tagihanPembayaran.aggregate({
      _sum: {
        nominal: true,
      },
      where: {
        statusBayar: 'LUNAS',
      },
    });
    const totalRevenue = revenueResult._sum.nominal ? Number(revenueResult._sum.nominal) : 0;

    // 4. Pending Approvals (KRS)
    const pendingApprovals = await this.prisma.krs.count({
      where: {
        statusApproval: 'PENDING',
      },
    });

    return {
      totalActiveStudents,
      krsCompletionRate,
      totalRevenue,
      pendingApprovals,
    };
  }
}
