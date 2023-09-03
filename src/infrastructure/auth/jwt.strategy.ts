import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@domain/user/user.service';
import { ResponseUserDto } from '@application/user/dto/response-user.dto';

export interface JwtPayload {
  userId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<ResponseUserDto> {
    const user = await this.userService.findOne({ id: payload.userId });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const responseMeDto = new ResponseUserDto(user);
    return responseMeDto;
  }
}
