import { IsInt, IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusKehadiran } from '../../generated/prisma/client';

export class BukaSesiDto {
  @ApiProperty({ example: 1, description: 'ID Jadwal Kuliah' })
  @IsInt()
  jadwalId: number;

  @ApiProperty({ example: 1, description: 'Nomor pertemuan ke berapa' })
  @IsInt()
  pertemuanKe: number;

  @ApiProperty({ example: '2026-06-20', description: 'Tanggal pertemuan (YYYY-MM-DD)' })
  @IsDateString()
  tanggal: string;
}

export class ScanQrDto {
  @ApiProperty({ example: 105 })
  @IsInt()
  sesiId: number;

  @ApiProperty({ example: 'xyz789securetokeN' })
  @IsString()
  @IsNotEmpty()
  qrToken: string;
}

export class UbahStatusAbsensiDto {
  @ApiProperty({ example: 1, description: 'ID AbsensiMahasiswa' })
  @IsInt()
  absensiId: number;

  @ApiProperty({ enum: StatusKehadiran })
  @IsEnum(StatusKehadiran)
  statusKehadiran: StatusKehadiran;
}
