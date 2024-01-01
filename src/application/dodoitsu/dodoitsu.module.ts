import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';
import { SYMBOL as DODOITSU_SYMBOL } from '@domain/dodoitsu/dodoitsu.repository.interface';

import { User } from '@domain/user/user.entity';

import { DodoitsuController } from '@application/dodoitsu/dodoitsu.controller';
import { DodoitsuApplicationService } from '@application/dodoitsu/dodoitsu.service';
import { DodoitsuService } from '@domain/dodoitsu/dodoitsu.service';
import { UserModule } from '@application/user/user.module';
import { ThemeModule } from '@application/theme/theme.module';

import { DodoitsuRepository } from '@infrastructure/orm/dodoitsu/dodoitsu.repository';
import { OptionalJwtStrategy } from '@infrastructure/auth/optional-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dodoitsu, User, DodoitsuLike]),
    JwtModule,
    ConfigModule,
    UserModule,
    ThemeModule,
  ],
  controllers: [DodoitsuController],
  providers: [
    DodoitsuApplicationService,
    DodoitsuService,
    {
      provide: DODOITSU_SYMBOL,
      useClass: DodoitsuRepository,
    },
    OptionalJwtStrategy,
  ],
  exports: [],
})
export class DodoitsuModule {}
