import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import {
  IDodoitsuRepository,
  SYMBOL,
} from '@domain/dodoitsu/dodoitsu.repository.interface';
import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { ResponseDodoitsuDto } from '@application/dodoitsu/dto/response-dodoitsu.dto';

import { UserService } from '@domain/user/user.service';
import { User } from '@domain/user/user.entity';

@Injectable()
export class DodoitsuService {
  constructor(
    @Inject(SYMBOL)
    private readonly dodoitsuRepository: IDodoitsuRepository,
    private readonly userService: UserService,
  ) {}

  async countAll(): Promise<number> {
    return this.dodoitsuRepository.count();
  }

  async findLatest(
    page: number,
    limit: number,
  ): Promise<ResponseDodoitsuDto[]> {
    return this.findDodoitsu(page, limit, { createdAt: 'DESC' });
  }

  async findPopular(
    page: number,
    limit: number,
  ): Promise<ResponseDodoitsuDto[]> {
    return this.findDodoitsu(page, limit, { createdAt: 'ASC' });
  }

  async findOne(id: string): Promise<ResponseDodoitsuDto | null> {
    const dodoitsu = await this.dodoitsuRepository.findOne(id);
    if (!dodoitsu) {
      throw new NotFoundException(`Dodoitsu with ID ${id} not found`);
    }
    return dodoitsu;
  }

  async create(
    createDodoitsuDto: CreateDodoitsuDto,
    user?: User,
  ): Promise<ResponseDodoitsuDto> {
    const dodoitsu = await this.dodoitsuRepository.create(
      createDodoitsuDto,
      user,
    );
    return this.dodoitsuRepository.save(dodoitsu);
  }

  private async findDodoitsu(
    page: number,
    limit: number,
    order: { [P in keyof Dodoitsu]?: 'ASC' | 'DESC' },
  ): Promise<ResponseDodoitsuDto[]> {
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
    });
  }
}
