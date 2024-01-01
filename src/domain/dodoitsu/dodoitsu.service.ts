import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  IDodoitsuRepository,
  SYMBOL,
} from '@domain/dodoitsu/dodoitsu.repository.interface';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';

import { User } from '@domain/user/user.entity';

import { Theme } from '@domain/theme/theme.entity';

@Injectable()
export class DodoitsuService {
  constructor(
    @Inject(SYMBOL)
    private readonly dodoitsuRepository: IDodoitsuRepository,
  ) {}

  async countAll(): Promise<number> {
    return this.dodoitsuRepository.count();
  }

  async findLatest(
    page: number,
    limit: number,
    themeId: number,
  ): Promise<Dodoitsu[]> {
    return this.findDodoitsuByOrder(
      page,
      limit,
      { createdAt: 'DESC' },
      themeId,
    );
  }

  async findPopular(
    page: number,
    limit: number,
    themeId: string,
  ): Promise<Dodoitsu[]> {
    const totalCount = await this.dodoitsuRepository.count();
    const totalPages = Math.ceil(totalCount / limit);

    if (page > totalPages) {
      throw new NotFoundException(
        `Invalid page number. There are only ${totalPages} pages.`,
      );
    }
    return this.dodoitsuRepository.findWithLikesOrder({
      order: {
        likes: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
      where: {
        theme: {
          id: themeId,
        },
      },
    });
  }

  async findOne(id: string): Promise<Dodoitsu | null> {
    const dodoitsu = await this.dodoitsuRepository.findOne(id);
    if (!dodoitsu) {
      throw new NotFoundException(`Dodoitsu with ID ${id} not found`);
    }
    return dodoitsu;
  }

  async create(
    dto: CreateDodoitsuDto,
    user?: User,
    theme?: Theme,
  ): Promise<Dodoitsu> {
    const dodoitsu = await this.dodoitsuRepository.create(dto, user, theme);
    return this.dodoitsuRepository.save(dodoitsu);
  }

  async likeDodoitsu(dodoitsu: Dodoitsu, user: User): Promise<void> {
    return this.dodoitsuRepository.like(dodoitsu, user);
  }

  async unlikeDodoitsu(dodoitsu: Dodoitsu, user: User): Promise<void> {
    return this.dodoitsuRepository.unlike(dodoitsu, user);
  }

  async didUserLike(dodoitsuId: string, userId: string): Promise<boolean> {
    return this.dodoitsuRepository.didUserLike(dodoitsuId, userId);
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Dodoitsu[]> {
    return this.dodoitsuRepository.findByUser(
      {
        take: limit,
        skip: (page - 1) * limit,
        order: { createdAt: 'DESC' },
      },
      userId,
    );
  }

  async countByUserId(userId: string): Promise<number> {
    return this.dodoitsuRepository.countByUser(userId);
  }

  async findLikedByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Dodoitsu[]> {
    return this.dodoitsuRepository.findLikedByUser(
      {
        take: limit,
        skip: (page - 1) * limit,
      },
      userId,
    );
  }

  async countLikedByUserId(userId: string): Promise<number> {
    return this.dodoitsuRepository.countLikedByUser(userId);
  }

  private async findDodoitsuByOrder(
    page: number,
    limit: number,
    order: { [P in keyof Dodoitsu]?: 'ASC' | 'DESC' },
    themeId?: number,
  ): Promise<Dodoitsu[]> {
    const totalCount = await this.dodoitsuRepository.count();
    const totalPages = Math.ceil(totalCount / limit);

    if (page > totalPages) {
      throw new NotFoundException(
        `Invalid page number. There are only ${totalPages} pages.`,
      );
    }

    return this.dodoitsuRepository.find({
      order,
      take: limit,
      skip: (page - 1) * limit,
      where: {
        theme: {
          id: themeId,
        },
      },
    });
  }
}
