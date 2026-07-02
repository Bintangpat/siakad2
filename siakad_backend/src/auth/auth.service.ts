import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: number, username: string, role: string) {
    const payload = { sub: userId, username, role };
    
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const { password: _pwd, refreshToken: _rt, ...userWithoutPassword } = user;
    return {
      ...tokens,
      user: userWithoutPassword,
    };
  }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ username: dto.username }, { email: dto.email }] },
    });

    if (existingUser) {
      throw new ConflictException('Username atau email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hashedPassword,
        namaLengkap: dto.namaLengkap,
        email: dto.email,
        role: dto.role,
      },
      omit: { password: true },
    });

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const { refreshToken: _rt, ...userWithoutPassword } = user as any;
    return {
      ...tokens,
      user: userWithoutPassword,
    };
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException('Akses ditolak');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Akses ditolak');
    }

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
      include: {
        mahasiswa: true,
        dosen: true,
      },
    });
    return user;
  }
}
