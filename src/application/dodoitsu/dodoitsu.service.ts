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

    const responseDodoitsuList = dodoitsuList.map((dodoitsu) => {
      const isLiked = dodoitsu.likes.some((like) => like.user.id === user.id);
      return new ResponseDodoitsuDto(dodoitsu, isLiked);
    });

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

    const responseDodoitsuList = dodoitsuList.map((dodoitsu) => {
      const isLiked = dodoitsu.likes.some((like) => like.user.id === user?.id);
      return new ResponseDodoitsuDto(dodoitsu, isLiked);
    });

    return responseDodoitsuList;
  }

  async findOneDodoitsu(
    id: string,
    user?: User,
  ): Promise<ResponseDodoitsuDto | null> {
    const dodoitsu = await this.dodoitsuDomainService.findOne(id);
    const isLiked = dodoitsu.likes.some((like) => like.user.id === user?.id);
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
    return this.dodoitsuDomainService.likeDodoitsu(id, user);
  }

  async unlikeDodoitsu(id: string, user: User): Promise<void> {
    return this.dodoitsuDomainService.unlikeDodoitsu(id, user);
  }
}
