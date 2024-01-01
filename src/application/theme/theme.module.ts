import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeController } from '@application/theme/theme.controller';
import { ThemeApplicationService } from '@application/theme/theme.service';

import { ThemeService } from '@domain/theme/theme.service';
import { Theme } from '@domain/theme/theme.entity';
import { ThemeRepository } from '@infrastructure/orm/theme/theme.repository';
import { SYMBOL } from '@domain/theme/theme.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  controllers: [ThemeController],
  providers: [
    ThemeApplicationService,
    ThemeService,
    {
      provide: SYMBOL,
      useClass: ThemeRepository,
    },
  ],
  exports: [ThemeService],
})
export class ThemeModule {}
