import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IDodoitsuRepository, SYMBOL } from './dodoitsu.repository.interface';
import { Dodoitsu } from './dodoitsu.entity';
import { CreateDodoitsuDto } from '../../application/dodoitsu/dto/create-dodoitsu.dto';

@Injectable()
export class DodoitsuService {
  constructor(
    @Inject(SYMBOL)
    private readonly dodoitsuRepository: IDodoitsuRepository,
  ) {}

  async findLatest(page: number, limit: number): Promise<Dodoitsu[]> {
    return this.findDodoitsu(page, limit, { createdAt: 'DESC' });
  }

  async findPopular(page: number, limit: number): Promise<Dodoitsu[]> {
    return this.findDodoitsu(page, limit, { likes: 'DESC' });
  }

  async findOne(id): Promise<Dodoitsu | null> {
    const dodoitsu = await this.dodoitsuRepository.findOne(id);
    if (!dodoitsu) {
      throw new NotFoundException(`Dodoitsu with ID ${id} not found`);
    }
    return dodoitsu;
  }

  async create(createDodoitsuDto: CreateDodoitsuDto): Promise<Dodoitsu> {
    const dodoitsu = await this.dodoitsuRepository.create(createDodoitsuDto);
    return this.dodoitsuRepository.save(dodoitsu);
  }

  async increaseLike(id: number): Promise<Dodoitsu> {
    const dodoitsu = await this.findOne(id);
    dodoitsu.likes += 1;
    return await this.dodoitsuRepository.save(dodoitsu);
  }

  async decreaseLike(id: number): Promise<Dodoitsu> {
    const dodoitsu = await this.findOne(id);
    if (dodoitsu.likes > 0) {
      dodoitsu.likes -= 1;
    }

    return await this.dodoitsuRepository.save(dodoitsu);
  }

  private async findDodoitsu(
    page: number,
    limit: number,
    order: { [P in keyof Dodoitsu]?: 'ASC' | 'DESC' },
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
    });
  }
}
