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
    const dodoitsuList = await this.entityManager.find(Dodoitsu, {
      ...options,
      relations: ['author', 'likes'],
    });
    return dodoitsuList;
  }

  async findWithLikesOrder(options: FindOptions): Promise<Dodoitsu[]> {
    const nativeDodoitsuList = await this.entityManager.query(`
      SELECT 
        dodoitsu.*,
      COUNT("dodoitsu_like"."id") AS likes_count 
      FROM 
        "dodoitsu"
      LEFT JOIN 
        dodoitsu_like ON dodoitsu.id = dodoitsu_like."dodoitsuId" 
      LEFT JOIN 
        "user" AS author ON dodoitsu."authorId" = author.id 
      GROUP BY 
        dodoitsu.id 
      ORDER BY 
        likes_count DESC 
      LIMIT 
        ${options.take} 
      OFFSET 
        ${options.skip};
    `);

    const promises = nativeDodoitsuList.map(async (dodoitsu) => {
      return this.entityManager.findOne(Dodoitsu, {
        where: { id: dodoitsu.id },
        relations: ['author', 'likes'],
      });
    });
    const dodoitsuList = await Promise.all(promises);

    return dodoitsuList;
  }

  async findOne(id: string): Promise<Dodoitsu> {
    const dodoitsu = await this.entityManager.findOne(Dodoitsu, {
      where: { id },
      relations: ['author', 'likes'],
    });

    return dodoitsu;
  }

  async findByUser(options: FindOptions, userId: string): Promise<Dodoitsu[]> {
    const dodoitsuList = await this.entityManager.find(Dodoitsu, {
      where: { author: { id: userId } },
      ...options,
      relations: ['author', 'likes'],
    });
    return dodoitsuList;
  }

  async countByUser(userId: string): Promise<number> {
    return await this.entityManager.count(Dodoitsu, {
      where: { author: { id: userId } },
    });
  }

  async findLikedByUser(
    options: FindOptions,
    userId: string,
  ): Promise<Dodoitsu[]> {
    const likedDodoitsuList = await this.entityManager
      .getRepository(DodoitsuLike)
      .createQueryBuilder('dodoitsuLike')
      .leftJoinAndSelect('dodoitsuLike.dodoitsu', 'dodoitsu')
      .leftJoinAndSelect('dodoitsu.author', 'user')
      .leftJoinAndSelect('dodoitsu.likes', 'dodoitsu_like')
      .where('dodoitsuLike.user.id = :userId', { userId })
      .skip(options.skip)
      .take(options.take)
      .getMany();

    return likedDodoitsuList.map((like) => like.dodoitsu);
  }

  async countLikedByUser(userId: string): Promise<number> {
    return await this.entityManager.count(DodoitsuLike, {
      where: { user: { id: userId } },
    });
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

  like(dodoitsu: Dodoitsu, user: User): void {
    const newLike = new DodoitsuLike();
    newLike.dodoitsu = dodoitsu;
    newLike.user = user;
    this.entityManager.save(DodoitsuLike, newLike);
  }

  unlike(dodoitsu: Dodoitsu, user: User): void {
    this.entityManager.delete(DodoitsuLike, { dodoitsu, user });
  }

  async didUserLike(dodoitsuId: string, userId: string): Promise<boolean> {
    const like = await this.entityManager.findOne(DodoitsuLike, {
      where: {
        dodoitsu: { id: dodoitsuId },
        user: { id: userId },
      },
    });

    return !!like;
  }
}
