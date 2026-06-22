import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMataKuliahDto {
  @ApiProperty({ example: 'MK001' })
  @IsNotEmpty()
  @IsString()
  kodeMk: string;

  @ApiProperty({ example: 'Pemrograman Web' })
  @IsNotEmpty()
  @IsString()
  namaMk: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @Min(1)
  sks: number;

  @ApiProperty({ example: 3, description: 'Semester pada paket kurikulum' })
  @IsInt()
  @Min(1)
  semesterPaket: number;
}

export class UpdateMataKuliahDto extends PartialType(CreateMataKuliahDto) {}
