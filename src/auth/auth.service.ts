import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../todos/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  // 회원가입 로직
  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { name, email, password } = createUserDto;
    console.log(name, email, password);
    // 이메일 중복 체크
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    try {
      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 데이터베이스에 사용자 저장
      const user = await this.usersService.create({
        name,
        email,
        password: hashedPassword,
      });

      return user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException('회원가입에 실패했습니다.');
    }
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });
      const user = await this.usersService.findOneByEmail(decoded.email);

      if (!user) {
        throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
      }

      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('유효하지 않은 Refresh Token입니다.');
    }
  }
}
