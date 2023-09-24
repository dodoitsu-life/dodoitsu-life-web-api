import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';
import { SYMBOL as DODOITSU_SYMBOL } from '@domain/dodoitsu/dodoitsu.repository.interface';

import { User } from '@domain/user/user.entity';
import { UserService } from '@domain/user/user.service';
import { SYMBOL as USER_SYMBOL } from '@domain/user/user.repository.interface';

import { DodoitsuController } from '@application/dodoitsu/dodoitsu.controller';
import { DodoitsuApplicationService } from '@application/dodoitsu/dodoitsu.service';
import { DodoitsuService } from '@domain/dodoitsu/dodoitsu.service';
import { UserModule } from '@application/user/user.module';

import { DodoitsuRepository } from '@infrastructure/orm/dodoitsu/dodoitsu.repository';
import { UserRepository } from '@infrastructure/orm/user/user.repository';
import { OptionalJwtStrategy } from '@infrastructure/auth/optional-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dodoitsu, User, DodoitsuLike]),
    PassportModule.register({ session: true }),
    JwtModule,
    ConfigModule,
    UserModule,
  ],
  controllers: [DodoitsuController],
  providers: [
    DodoitsuApplicationService,
    DodoitsuService,
    {
      provide: DODOITSU_SYMBOL,
      useClass: DodoitsuRepository,
    },
    UserService,
    {
      provide: USER_SYMBOL,
      useClass: UserRepository,
    },
    JwtService,
    OptionalJwtStrategy,
  ],
  exports: [PassportModule],
})
export class DodoitsuModule {}
