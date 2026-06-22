import {
  IsNotEmpty, IsString, IsInt, Min, IsEnum, IsDateString,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SemesterTipe } from '../../generated/prisma/client';

export class CreateJadwalDto {
  @ApiProperty({ example: 'MK001' })
  @IsNotEmpty()
  @IsString()
  kodeMk: string;

  @ApiProperty({ example: '0101010001' })
  @IsNotEmpty()
  @IsString()
  nidnDosen: string;

  @ApiProperty({ example: '2025/2026' })
  @IsNotEmpty()
  @IsString()
  tahunAkademik: string;

  @ApiProperty({ enum: SemesterTipe, example: SemesterTipe.GANJIL })
  @IsEnum(SemesterTipe)
  semesterTipe: SemesterTipe;

  @ApiProperty({ example: 'Senin' })
  @IsNotEmpty()
  @IsString()
  hari: string;

  @ApiProperty({ example: '2026-01-01T08:00:00.000Z', description: 'Jam mulai (ISO format)' })
  @IsDateString()
  jamMulai: string;

  @ApiProperty({ example: '2026-01-01T10:00:00.000Z', description: 'Jam selesai (ISO format)' })
  @IsDateString()
  jamSelesai: string;

  @ApiProperty({ example: 'Lab A-101' })
  @IsNotEmpty()
  @IsString()
  ruangan: string;

  @ApiProperty({ example: 40 })
  @IsInt()
  @Min(1)
  kuota: number;
}

export class UpdateJadwalDto extends PartialType(CreateJadwalDto) {}
