import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../../domain/user/user.entity';
import { IUserRepository } from '../../../domain/user/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findByTwitterId(twitterId: string): Promise<User | undefined> {
    return this.entityManager.findOne(User, {
      where: { twitterId },
    });
  }

  async create(user: User): Promise<User> {
    return this.entityManager.save(user);
  }
}
