import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '@domain/user/user.entity';
import { UserService } from '@domain/user/user.service';

export interface JwtPayload {
  userId: string;
}

@Injectable()
export class OptionalJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-optional',
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('auth.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload | undefined): Promise<User | undefined> {
    if (!payload) {
      return undefined;
    }
    const user = await this.userService.findOne({ id: payload.userId });
    if (!user) {
      return undefined;
    }
    return user;
  }
}
