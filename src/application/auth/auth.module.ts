import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../domain/auth/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../../domain/user/user.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { TwitterStrategy } from 'src/infrastructure/auth/twitter.strategy';
import { User } from 'src/domain/user/user.entity';
import { SYMBOL as USERSYMBOL } from '../../domain/user/user.repository.interface';
import { UserRepository } from 'src/infrastructure/orm/user/user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    UserModule,
    ConfigModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    TwitterStrategy,
    {
      provide: USERSYMBOL,
      useClass: UserRepository,
    },
  ],
  exports: [PassportModule],
})
export class AuthModule {}
