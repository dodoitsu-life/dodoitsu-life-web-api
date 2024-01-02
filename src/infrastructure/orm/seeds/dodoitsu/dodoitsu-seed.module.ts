import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Dodoitsu } from '@/domain/dodoitsu/dodoitsu.entity';
import { DodoitsuLike } from '@/domain/dodoitsu/dodoitsu-like.entity';
import { User } from '@domain/user/user.entity';
import { Theme } from '@domain/theme/theme.entity';

import { DodoitsuSeedService } from './dodoitsu-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dodoitsu, DodoitsuLike, User, Theme])],
  providers: [DodoitsuSeedService],
  exports: [DodoitsuSeedService],
})
export class DodoitsuSeedModule {}
