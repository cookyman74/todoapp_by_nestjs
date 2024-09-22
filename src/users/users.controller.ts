import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 새로운 사용자 등록
  @Post()
  createUser(@Body() creeateUserDto: CreateUserDto) {
    return this.usersService.create(creeateUserDto);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }
}
