import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IAuthRepository, SYMBOL } from './auth.repository.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(SYMBOL)
    private readonly authRepository: IAuthRepository,
  ) {}

  async handleCallback(req: Request) {
    const user = await this.authRepository.getUserFromCallback(req);
    const existingUser = await this.userService.findByTwitterId(user.twitterId);

    if (existingUser) {
      return existingUser;
    }

    return this.userService.create({
      twitterId: user.twitterId,
      username: user.username,
    });
  }
}
