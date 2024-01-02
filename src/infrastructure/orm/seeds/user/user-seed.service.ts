import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

import { User } from '@domain/user/user.entity';

const GENERATE_USER = 5;

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    for (let i = 0; i < GENERATE_USER; i++) {
      const userId = randomUUID();
      await this.repository.save(
        this.repository.create({
          id: userId,
          twitterId: `${i}`,
          name: `${i}'s user`,
          photo: '',
          refreshToken: '',
        }),
      );
    }
  }

  delete() {
    return this.repository.delete({});
  }
}
