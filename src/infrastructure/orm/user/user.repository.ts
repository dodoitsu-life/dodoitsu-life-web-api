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
  async findOne(criteria: Partial<User>): Promise<User | undefined> {
    return this.entityManager.findOne(User, {
      where: criteria,
    });
  }

  async create(user: User): Promise<User> {
    const newUser = this.entityManager.create(User, user);
    return this.entityManager.save(newUser);
  }

  async save(user: User): Promise<User> {
    return this.entityManager.save(user);
  }
}
