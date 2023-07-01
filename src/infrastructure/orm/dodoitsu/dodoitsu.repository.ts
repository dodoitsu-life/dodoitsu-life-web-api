import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  IDodoitsuRepository,
  FindOptions,
} from '../../../domain/dodoitsu/dodoitsu.repository.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Dodoitsu } from '../../../domain/dodoitsu/dodoitsu.entity';
import { CreateDodoitsuDto } from '../../../application/dodoitsu/dto/create-dodoitsu.dto';

@Injectable()
export class DodoitsuRepository implements IDodoitsuRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async find(options: FindOptions): Promise<Dodoitsu[]> {
    return await this.entityManager.find(Dodoitsu, options);
  }

  async findOne(id: number): Promise<Dodoitsu> {
    return await this.entityManager.findOne(Dodoitsu, {
      where: { id },
    });
  }

  async count(): Promise<number> {
    return await this.entityManager.count(Dodoitsu);
  }

  async create(createDodoitsuDto: CreateDodoitsuDto): Promise<Dodoitsu> {
    const dodoitsu = new Dodoitsu();
    dodoitsu.content = createDodoitsuDto.content;
    dodoitsu.description = createDodoitsuDto.description;
    return await dodoitsu;
  }

  async save(dodoitsu: Dodoitsu): Promise<Dodoitsu> {
    return await this.entityManager.save(dodoitsu);
  }
}
