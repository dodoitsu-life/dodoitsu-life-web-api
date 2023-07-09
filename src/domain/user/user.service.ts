import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository, SYMBOL } from './user.repository.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(SYMBOL)
    private readonly userRepository: IUserRepository,
  ) {}

  async findByTwitterId(twitterId: string): Promise<User | undefined> {
    return this.userRepository.findByTwitterId(twitterId);
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.create(user);
  }
}
