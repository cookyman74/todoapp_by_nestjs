// src/todos/dto/create-todo.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: '제목은 필수 입력 항목입니다.' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  priority?: number;
  @IsDateString()
  @IsOptional()
  deadline?: Date;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  assignedTo?: string;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsOptional()
  completed?: boolean = false;
}
