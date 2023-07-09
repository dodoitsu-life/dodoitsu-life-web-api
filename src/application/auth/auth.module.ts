import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../domain/auth/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../../domain/user/user.service';
import { UserModule } from '../user/user.module';
import { SYMBOL } from '../../domain/auth/auth.repository.interface';
import { AuthRepository } from '../../infrastructure/auth/auth.repository';
import { PassportModule } from '@nestjs/passport';
import { TwitterStrategy } from '../../infrastructure/auth/twitter.strategy';
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
    PassportModule.register({ defaultStrategy: 'twitter' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    TwitterStrategy,
    {
      provide: SYMBOL,
      useClass: AuthRepository,
    },
    {
      provide: USERSYMBOL,
      useClass: UserRepository,
    },
  ],
  exports: [PassportModule],
})
export class AuthModule {}
