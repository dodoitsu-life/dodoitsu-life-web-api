import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository, SYMBOL } from './user.repository.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(SYMBOL)
    private readonly userRepository: IUserRepository,
  ) {}
  async findOne(criteria: Partial<User>): Promise<User | undefined> {
    return this.userRepository.findOne(criteria);
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }
}
