import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  IThemeRepository,
  SYMBOL,
} from '@domain/theme/theme.repository.interface';

import { Theme } from '@domain/theme/theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @Inject(SYMBOL)
    private readonly themeRepository: IThemeRepository,
  ) {}

  async countAll(): Promise<number> {
    return this.themeRepository.count();
  }

  async countCurrentOrPast(): Promise<number> {
    return this.themeRepository.countCurrentOrPast();
  }

  async findCurrentOrPast(page: number, limit: number) {
    const totalCount = await this.themeRepository.count();
    const totalPages = Math.ceil(totalCount / limit);

    if (page > totalPages) {
      throw new NotFoundException(
        `Invalid page number. There are only ${totalPages} pages.`,
      );
    }

    return this.themeRepository.findCurrentOrPast({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: number): Promise<Theme> {
    const theme = await this.themeRepository.findOne(id);
    if (!theme) {
      throw new NotFoundException(`Dodoitsu with ID ${id} not found`);
    }
    return theme;
  }
}
