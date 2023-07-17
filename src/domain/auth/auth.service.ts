import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { TwitterUserPayload } from '../../infrastructure/auth/twitter.strategy';

type UserPayload = TwitterUserPayload;

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async handleCallback(req: Request & { user: UserPayload }): Promise<User> {
    const user = req.user;
    let userEntity = new User();

    userEntity.twitterId = user.twitterId;
    userEntity.name = user.name;
    userEntity.photo = user.photo;

    const existingUser = await this.userService.findByTwitterId(
      userEntity.twitterId,
    );

    if (existingUser) {
      return existingUser;
    }

    return await this.userService.create(userEntity);
  }
}
