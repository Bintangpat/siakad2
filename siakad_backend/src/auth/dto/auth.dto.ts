import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/client';

export class LoginDto {
  @ApiProperty({ example: '20260001', description: 'Username / NIM / NIDN' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: '20260001', description: 'NIM / NIDN / Username Admin' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Ahmad Fauzi', description: 'Nama lengkap user' })
  @IsNotEmpty()
  @IsString()
  namaLengkap: string;

  @ApiProperty({ example: 'ahmad@kampus.ac.id' })
  @IsEmail()
  email: string;

  @ApiProperty({ enum: Role, example: Role.MAHASISWA })
  @IsEnum(Role)
  role: Role;
}
