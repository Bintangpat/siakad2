import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    // Return all users without their passwords
    const users = await this.prisma.user.findMany({
      omit: { password: true },
      include: {
        mahasiswa: true,
        dosen: true,
      },
    });
    return users;
  }

  async createUser(data: any) {
    const { username, password, email, namaLengkap, role } = data;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Username atau email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        namaLengkap,
        role: role as Role,
      },
    });

    // Handle nested relation creation based on role
    if (role === 'MAHASISWA') {
      await this.prisma.mahasiswa.create({
        data: {
          nim: username,
          userId: user.id,
          angkatan: new Date().getFullYear(),
        },
      });
    } else if (role === 'DOSEN') {
      await this.prisma.dosen.create({
        data: {
          nidn: username,
          userId: user.id,
        },
      });
    }

    // Return without password
    const { password: _, ...result } = user;
    return result;
  }
}
