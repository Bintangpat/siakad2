import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '../generated/prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login dan dapatkan JWT token' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);
    
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15m
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return {
      message: 'Login berhasil',
      data: result.user,
    };
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buat akun user baru (Admin only)' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(dto);
    
    // We only set cookies if the user registers themselves (but this is admin only, so maybe we shouldn't overwrite the admin's session? Usually yes, admin creating a user shouldn't log them in as that user). 
    // Since this is an admin route, we shouldn't overwrite the admin's cookies. Let's return the user.
    return {
      message: 'User berhasil dibuat',
      data: result.user,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh JWT access token' })
  async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Akses ditolak'); 
    }

    const decoded = this.authService['jwtService'].decode(refreshToken) as any;
    if (!decoded || !decoded.sub) {
      throw new UnauthorizedException('Akses ditolak');
    }

    const tokens = await this.authService.refreshTokens(decoded.sub, refreshToken);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Token berhasil di-refresh' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout dan hapus token' })
  async logout(@GetUser('id') userId: number, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(userId);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logout berhasil' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Profil user yang sedang login' })
  async getMe(@GetUser('id') userId: number) {
    const user = await this.authService.getMe(userId);
    return {
      message: 'Profil berhasil diambil',
      data: user,
    };
  }
}
