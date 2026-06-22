import { Module } from '@nestjs/common';
import { KhsController } from './khs.controller';
import { KhsService } from './khs.service';

@Module({
  controllers: [KhsController],
  providers: [KhsService],
})
export class KhsModule {}
