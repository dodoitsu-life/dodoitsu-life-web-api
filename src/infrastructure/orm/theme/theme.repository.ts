import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, LessThanOrEqual } from 'typeorm';

import {
  FindOptions,
  IThemeRepository,
} from '@domain/theme/theme.repository.interface';
import { Theme } from '@/domain/theme/theme.entity';

@Injectable()
export class ThemeRepository implements IThemeRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findCurrentOrPast(options: FindOptions): Promise<Theme[]> {
    const currentDate = new Date().toISOString();
    const theme = await this.entityManager.find(Theme, {
      where: {
        startDate: LessThanOrEqual(currentDate),
      },
      //   order: {
      //     endDate: 'ASC',
      //   },
      ...options,
    });
    return theme;
  }

  async findOne(id: string): Promise<Theme> {
    const theme = await this.entityManager.findOne(Theme, {
      where: { id },
    });

    return theme;
  }

  async count(): Promise<number> {
    return await this.entityManager.count(Theme);
  }

  async countCurrentOrPast(): Promise<number> {
    const currentDate = new Date().toISOString();
    return await this.entityManager.count(Theme, {
      where: {
        startDate: LessThanOrEqual(currentDate),
      },
    });
  }
}
