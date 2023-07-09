import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../../domain/user/user.entity';
import { IAuthRepository } from 'src/domain/auth/auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  async getUserFromCallback(req: Request): Promise<User> {
    // Auth0との通信を行い、ユーザー情報を取得します
    // この部分はAuth0の設定によります
    // @ts-ignore
    const { user } = req.query;
    const userEntity = new User();
    userEntity.username = user.username;
    userEntity.twitterId = user.twitterId;

    return userEntity;
  }
}
