import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

import { UserService } from '@domain/user/user.service';
import { User } from '@domain/user/user.entity';
import {
  IUserRepository,
  SYMBOL,
} from '@domain/user/user.repository.interface';
import { TwitterUserPayload } from '@infrastructure/auth/twitter.strategy';
import { JwtPayload } from '@infrastructure/auth/jwt.strategy';

type UserPayload = TwitterUserPayload;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(SYMBOL)
    private readonly userRepository: IUserRepository,
  ) {}

  async handleCallback(req: Request & { user: UserPayload }): Promise<User> {
    const user = req.user;
    const userEntity = new User();

    userEntity.twitterId = user.twitterId;
    userEntity.name = user.name;
    userEntity.photo = user.photo.replace('_normal', '');

    const existingUser = await this.userService.findOne({
      twitterId: userEntity.twitterId,
    });

    if (existingUser) {
      return existingUser;
    }

    return await this.userService.create(userEntity);
  }

  async generateTokens(
    user: User,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload: JwtPayload = {
      userId: user.id,
    };

    const accessToken = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('auth.jwt.secret'),
      expiresIn: this.configService.get<string>('auth.jwt.expire'),
    });

    const refreshToken = await this.generateRefreshToken(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = uuidv4();
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return refreshToken;
  }

  async handleRefreshToken(refreshToken: string): Promise<User> {
    const user = await this.userRepository.findOne({ refreshToken });

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return user;
  }

  async invalidateRefreshToken(refreshToken: string): Promise<void> {
    const user = await this.userRepository.findOne({ refreshToken });

    if (user) {
      user.refreshToken = null;
      await this.userRepository.save(user);
    }
  }
}
