import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // 데이터베이스에 연결
  }

  async onModuleDestroy() {
    await this.$disconnect(); // 모듈이 종료될 때 데이터베이스 연결 해제
  }
}
