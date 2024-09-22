import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // 비밀 키 설정
    });
    console.log(
      'JWT_SECRET from JwtStrategy:',
      configService.get<string>('JWT_SECRET'),
    ); // 디버깅 출력
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
