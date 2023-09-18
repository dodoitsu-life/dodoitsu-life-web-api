import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import {
  IDodoitsuRepository,
  FindOptions,
} from '@domain/dodoitsu/dodoitsu.repository.interface';
import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';

import { User } from '@domain/user/user.entity';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';

@Injectable()
export class DodoitsuRepository implements IDodoitsuRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async find(options: FindOptions): Promise<Dodoitsu[]> {
    const dodoitsus = await this.entityManager.find(Dodoitsu, {
      ...options,
      relations: ['author', 'likes'],
    });
    return dodoitsus;
  }

  async findOne(id: string): Promise<Dodoitsu> {
    const dodoitsu = await this.entityManager.findOne(Dodoitsu, {
      where: { id },
      relations: ['author', 'likes'],
    });
    return dodoitsu;
  }

  async count(): Promise<number> {
    return await this.entityManager.count(Dodoitsu);
  }

  async create(
    createDodoitsuDto: CreateDodoitsuDto,
    author?: User,
  ): Promise<Dodoitsu> {
    const dodoitsu = new Dodoitsu();
    dodoitsu.content = createDodoitsuDto.content;
    dodoitsu.description = createDodoitsuDto.description;
    if (author) {
      dodoitsu.author = author;
    }
    return await dodoitsu;
  }

  async save(dodoitsu: Dodoitsu): Promise<Dodoitsu> {
    const newDodoitsu = await this.entityManager.save(dodoitsu);
    return newDodoitsu;
  }

  async like(dodoitsu: Dodoitsu, user: User): Promise<void> {
    const existingLike = await this.entityManager.findOne(DodoitsuLike, {
      where: { dodoitsu, user },
    });
    if (!existingLike) {
      const newLike = new DodoitsuLike();
      newLike.dodoitsu = dodoitsu;
      newLike.user = user;
      await this.entityManager.save(DodoitsuLike, newLike);
    }
  }

  async unlike(dodoitsu: Dodoitsu, user: User): Promise<void> {
    await this.entityManager.delete(DodoitsuLike, { dodoitsu, user });
  }
}
