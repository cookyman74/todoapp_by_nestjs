import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    // 사용자가 없거나 비밀번호가 틀린 경우 예외 처리
    if (!user) {
      throw new BadRequestException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    // 검증된 사용자로 JWT 발급
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.authService.refreshToken(body.refreshToken);
  }
}
