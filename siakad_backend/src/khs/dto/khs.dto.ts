import { IsInt, IsNumber, Min, Max, IsOptional, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class NilaiItemDto {
  @ApiProperty({ example: '20260001' })
  @IsNotEmpty()
  nim: string;

  @ApiProperty({ example: 80, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  tugas: number;

  @ApiProperty({ example: 75, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  uts: number;

  @ApiProperty({ example: 85, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  uas: number;

  @ApiProperty({ example: 90, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  presensi: number;
}

export class InputKolektifDto {
  @ApiProperty({ example: 10, description: 'ID Jadwal Kuliah' })
  @IsInt()
  jadwalId: number;

  @ApiProperty({ type: [NilaiItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NilaiItemDto)
  nilaiData: NilaiItemDto[];
}
