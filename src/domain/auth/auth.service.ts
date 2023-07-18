import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { TwitterUserPayload } from '../../infrastructure/auth/twitter.strategy';
import { JwtPayload } from 'src/infrastructure/auth/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { IUserRepository, SYMBOL } from '../user/user.repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { UnauthorizedException } from '@nestjs/common';

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
    let userEntity = new User();

    userEntity.twitterId = user.twitterId;
    userEntity.name = user.name;
    userEntity.photo = user.photo;

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
      expiresIn: '40m',
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
    // find the user associated with the refresh token
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
