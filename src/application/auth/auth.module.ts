import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from '@domain/auth/auth.service';
import { UserService } from '@domain/user/user.service';
import { User } from '@domain/user/user.entity';
import { SYMBOL as USER_SYMBOL } from '@domain/user/user.repository.interface';

import { AuthController } from '@application/auth/auth.controller';
import { UserModule } from '@application/user/user.module';

import { TwitterStrategy } from '@infrastructure/auth/twitter.strategy';
import { JwtStrategy } from '@infrastructure/auth/jwt.strategy';
import { UserRepository } from '@infrastructure/orm/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    ConfigModule,
    PassportModule.register({ session: true }),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtService,
    TwitterStrategy,
    JwtStrategy,
    {
      provide: USER_SYMBOL,
      useClass: UserRepository,
    },
  ],
  exports: [PassportModule],
})
export class AuthModule {}
