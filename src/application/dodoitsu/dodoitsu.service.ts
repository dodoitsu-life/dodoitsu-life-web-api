import { Injectable } from '@nestjs/common';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { ResponseDodoitsuDto } from '@application/dodoitsu/dto/response-dodoitsu.dto';
import { DodoitsuService } from '@domain/dodoitsu/dodoitsu.service';
import { User } from '@domain/user/user.entity';

@Injectable()
export class DodoitsuApplicationService {
  constructor(private readonly dodoitsuDomainService: DodoitsuService) {}

  async countAllDodoitsu(): Promise<number> {
    return this.dodoitsuDomainService.countAll();
  }

  async findLatestDodoitsu(
    page: number,
    limit: number,
    user?: User,
  ): Promise<ResponseDodoitsuDto[]> {
    const dodoitsuList = await this.dodoitsuDomainService.findLatest(
      page,
      limit,
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
  ): Promise<ResponseDodoitsuDto[]> {
    const dodoitsuList = await this.dodoitsuDomainService.findPopular(
      page,
      limit,
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
  ): Promise<ResponseDodoitsuDto> {
    const dodoitsu = await this.dodoitsuDomainService.create(dto, user);
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
