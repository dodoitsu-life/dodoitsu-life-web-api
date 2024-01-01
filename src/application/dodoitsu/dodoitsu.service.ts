import { Injectable } from '@nestjs/common';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { ResponseDodoitsuDto } from '@application/dodoitsu/dto/response-dodoitsu.dto';
import { DodoitsuService } from '@domain/dodoitsu/dodoitsu.service';
import { ThemeService } from '@domain/theme/theme.service';

import { User } from '@domain/user/user.entity';

@Injectable()
export class DodoitsuApplicationService {
  constructor(
    private readonly dodoitsuDomainService: DodoitsuService,
    private readonly themeDomainService: ThemeService,
  ) {}

  async countAllDodoitsu(): Promise<number> {
    return this.dodoitsuDomainService.countAll();
  }

  async findLatestDodoitsu(
    page: number,
    limit: number,
    user?: User,
    themeId?: number,
  ): Promise<ResponseDodoitsuDto[]> {
    const dodoitsuList = await this.dodoitsuDomainService.findLatest(
      page,
      limit,
      themeId,
    );

    const responseDodoitsuList = await Promise.all(
      dodoitsuList.map(async (dodoitsu) => {
        const isLiked = user
          ? await this.dodoitsuDomainService.didUserLike(dodoitsu.id, user.id)
          : false;
        return new ResponseDodoitsuDto(dodoitsu, isLiked);
      }),
    );
    return responseDodoitsuList;
  }

  async findPopularDodoitsu(
    page: number,
    limit: number,
    user?: User,
    themeId?: string,
  ): Promise<ResponseDodoitsuDto[]> {
    const dodoitsuList = await this.dodoitsuDomainService.findPopular(
      page,
      limit,
      themeId,
    );

    const responseDodoitsuList = await Promise.all(
      dodoitsuList.map(async (dodoitsu) => {
        const isLiked = user
          ? await this.dodoitsuDomainService.didUserLike(dodoitsu.id, user.id)
          : false;
        return new ResponseDodoitsuDto(dodoitsu, isLiked);
      }),
    );
    return responseDodoitsuList;
  }

  async findOneDodoitsu(
    id: string,
    user?: User,
  ): Promise<ResponseDodoitsuDto | null> {
    const dodoitsu = await this.dodoitsuDomainService.findOne(id);
    const isLiked = user
      ? await this.dodoitsuDomainService.didUserLike(id, user.id)
      : false;
    return new ResponseDodoitsuDto(dodoitsu, isLiked);
  }

  async createDodoitsu(
    dto: CreateDodoitsuDto,
    user?: User,
    themeId?: string,
  ): Promise<ResponseDodoitsuDto> {
    const theme = themeId && (await this.themeDomainService.findOne(themeId));
    // theme.startDate ~ theme.endDateの期間中以外の場合、エラーを出し処理を中断するa
    if (theme) {
      const now = new Date();
      if (now < theme.startDate || now > theme.endDate) {
        throw new Error('現在はこのお題で都々逸を投稿することはできません。');
      }
    }
    const dodoitsu = await this.dodoitsuDomainService.create(dto, user, theme);
    return new ResponseDodoitsuDto(dodoitsu, false);
  }

  async likeDodoitsu(id: string, user: User): Promise<void> {
    const isLiked = await this.dodoitsuDomainService.didUserLike(id, user.id);
    if (isLiked) {
      throw new Error('Already liked');
    }
    const dodoitsu = await this.dodoitsuDomainService.findOne(id);
    return this.dodoitsuDomainService.likeDodoitsu(dodoitsu, user);
  }

  async unlikeDodoitsu(id: string, user: User): Promise<void> {
    const dodoitsu = await this.dodoitsuDomainService.findOne(id);
    return this.dodoitsuDomainService.unlikeDodoitsu(dodoitsu, user);
  }

  async findDodoitsuByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ResponseDodoitsuDto[]> {
    const dodoitsuList = await this.dodoitsuDomainService.findByUserId(
      userId,
      page,
      limit,
    );

    const responseDodoitsuList = await Promise.all(
      dodoitsuList.map(async (dodoitsu) => {
        const isLiked = await this.dodoitsuDomainService.didUserLike(
          dodoitsu.id,
          userId,
        );
        return new ResponseDodoitsuDto(dodoitsu, isLiked);
      }),
    );
    return responseDodoitsuList;
  }

  async countDodoitsuByUserId(userId: string): Promise<number> {
    return this.dodoitsuDomainService.countByUserId(userId);
  }

  async findLikedDodoitsuByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<ResponseDodoitsuDto[]> {
    const dodoitsuList = await this.dodoitsuDomainService.findLikedByUserId(
      userId,
      page,
      limit,
    );

    const responseDodoitsuList = await Promise.all(
      dodoitsuList.map((dodoitsu) => {
        return new ResponseDodoitsuDto(dodoitsu, true); // 既にいいねされているのでisLikedはtrue
      }),
    );
    return responseDodoitsuList;
  }

  async countLikedDodoitsuByUserId(userId: string): Promise<number> {
    return this.dodoitsuDomainService.countLikedByUserId(userId);
  }
}
