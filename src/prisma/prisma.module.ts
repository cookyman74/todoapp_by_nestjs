import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // PrismaService를 외부에서 사용할 수 있도록 내보냄
})
export class PrismaModule {}
