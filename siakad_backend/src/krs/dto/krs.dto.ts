import { IsArray, IsInt, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PilihKrsDto {
  @ApiProperty({ example: [10, 12, 15], description: 'Array jadwal_id yang dipilih' })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  jadwalIds: number[];
}

export class ApprovalKrsDto {
  @ApiProperty({ example: 'DISETUJUI', enum: ['DISETUJUI', 'DITOLAK'] })
  @IsNotEmpty()
  statusApproval: 'DISETUJUI' | 'DITOLAK';

  @ApiProperty({ example: 'KRS disetujui tanpa catatan', required: false })
  catatanDosen?: string;
}
