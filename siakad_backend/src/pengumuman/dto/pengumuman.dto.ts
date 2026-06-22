import { IsNotEmpty, IsString, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TargetAudien } from '../../generated/prisma/client';

export class CreatePengumumanDto {
  @ApiProperty({ example: 'Pengumuman UTS Semester Ganjil 2025/2026' })
  @IsNotEmpty()
  @IsString()
  judul: string;

  @ApiProperty({ example: 'Dengan hormat, UTS akan dilaksanakan mulai tanggal...' })
  @IsNotEmpty()
  @IsString()
  konten: string;

  @ApiProperty({ enum: TargetAudien, default: TargetAudien.SEMUA })
  @IsEnum(TargetAudien)
  @IsOptional()
  targetAudien?: TargetAudien = TargetAudien.SEMUA;

  @ApiProperty({ example: 2026, required: false, description: 'Target angkatan tertentu (null = semua angkatan)' })
  @IsInt()
  @IsOptional()
  targetAngkatan?: number;
}
