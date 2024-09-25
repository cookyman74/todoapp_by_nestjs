import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findAllByUser(userId: number) {
    return this.prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });
  }

  // 특정 할 일 조회 (사용자 ID와 할 일 ID로 조회)
  async findOne(userId: number, todoId: number) {
    const todo = await this.prisma.todo.findFirst({
      where: { id: todoId, userId },
    });
    if (!todo) {
      throw new NotFoundException('할 일을 찾을 수 없습니다.');
    }
    return todo;
  }

  async create(userId: number, createTodoDto: any) {
    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        userId,
      },
    });
  }

  // 업데이트 로직 추가
  async update(userId: number, todoId: number, updateTodoDto: any) {
    const todo = await this.prisma.todo.findFirst({
      where: { id: todoId, userId },
    });

    if (!todo) {
      throw new NotFoundException('할 일을 찾을 수 없습니다.');
    }

    return this.prisma.todo.update({
      where: { id: todoId },
      data: {
        ...updateTodoDto,
      },
    });
  }

  // 할 일 삭제
  async remove(userId: number, todoId: number) {
    const todo = await this.prisma.todo.findFirst({
      where: { id: todoId, userId },
    });

    if (!todo) {
      throw new NotFoundException('할 일을 찾을 수 없습니다.');
    }

    return this.prisma.todo.delete({
      where: { id: todoId },
    });
  }

  updateTodoStatus(todoId: number, completed: boolean, userId: any) {
    return this.prisma.todo.updateMany({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        completed: completed,
      },
    });
  }
}
