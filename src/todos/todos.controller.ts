import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // 인증된 사용자만 접근 가능한 앤드포인트
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllTodos(@Request() req) {
    // JWT가 유효하면 이부분 실행
    return this.todosService.findAllByUser(req.user.userId);
  }

  // 특정 할 일 조회
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getTodoById(@Request() req, @Param('id') todoId: number) {
    return this.todosService.findOne(req.user.userId, todoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createTodo(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    // JWT가 유효하면 새로운 할 일 생성
    return this.todosService.create(req.user.userId, createTodoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id') // 업데이트 엔드포인트 추가
  updateTodo(
    @Request() req,
    @Param('id') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(req.user.userId, todoId, updateTodoDto);
  }

  // 할 일 삭제
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  removeTodo(@Request() req, @Param('id') todoId: string) {
    // todoId를 문자열에서 정수로 변환
    const todoIdAsInt = parseInt(todoId, 10);

    if (isNaN(todoIdAsInt)) {
      throw new Error('Invalid todo ID'); // ID가 정수가 아닌 경우 에러 처리
    }

    console.log(req.user);
    return this.todosService.remove(req.user.userId, todoIdAsInt);
  }
}
