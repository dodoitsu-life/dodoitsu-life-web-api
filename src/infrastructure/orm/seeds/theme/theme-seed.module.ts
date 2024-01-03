import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from '@domain/theme/theme.entity';

import { ThemeSeedService } from './theme-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemeSeedService],
  exports: [ThemeSeedService],
})
export class ThemeSeedModule {}
