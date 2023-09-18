import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import {
  IDodoitsuRepository,
  SYMBOL,
} from '@domain/dodoitsu/dodoitsu.repository.interface';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';

import { User } from '@domain/user/user.entity';

@Injectable()
export class DodoitsuService {
  constructor(
    @Inject(SYMBOL)
    private readonly dodoitsuRepository: IDodoitsuRepository,
  ) {}

  async countAll(): Promise<number> {
    return this.dodoitsuRepository.count();
  }

  async findLatest(page: number, limit: number): Promise<Dodoitsu[]> {
    return this.findDodoitsuByOrder(page, limit, { createdAt: 'DESC' });
  }

  async findPopular(page: number, limit: number): Promise<Dodoitsu[]> {
    return this.findDodoitsuByOrder(page, limit, { createdAt: 'ASC' });
  }

  async findOne(id: string): Promise<Dodoitsu | null> {
    const dodoitsu = await this.dodoitsuRepository.findOne(id);
    if (!dodoitsu) {
      throw new NotFoundException(`Dodoitsu with ID ${id} not found`);
    }
    return dodoitsu;
  }

  async create(dto: CreateDodoitsuDto, user?: User): Promise<Dodoitsu> {
    const dodoitsu = await this.dodoitsuRepository.create(dto, user);
    return this.dodoitsuRepository.save(dodoitsu);
  }

  private async findDodoitsuByOrder(
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

  async likeDodoitsu(dodoitsuId: string, user: User): Promise<void> {
    const dodoitsu = await this.findOne(dodoitsuId);

    if (dodoitsu.likes.some((like) => like.user.id === user.id)) {
      throw new ConflictException('User already liked this Dodoitsu.');
    }

    const newLike = new DodoitsuLike();
    newLike.user = user;
    newLike.dodoitsu = dodoitsu;

    dodoitsu.likes.push(newLike);
    await this.dodoitsuRepository.save(dodoitsu); // Assuming that cascade options are set to save related entities
  }

  async unlikeDodoitsu(dodoitsuId: string, user: User): Promise<void> {
    const dodoitsu = await this.findOne(dodoitsuId);

    const likeIndex = dodoitsu.likes.findIndex(
      (like) => like.user.id === user.id,
    );
    if (likeIndex === -1) {
      throw new NotFoundException('User has not liked this Dodoitsu yet.');
    }

    dodoitsu.likes.splice(likeIndex, 1);
    await this.dodoitsuRepository.save(dodoitsu); // Again, assuming cascade options are set
  }
}
