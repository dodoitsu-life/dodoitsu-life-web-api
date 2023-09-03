import { User } from '@domain/user/user.entity';

export const SYMBOL = Symbol('IAuthRepository');

export interface IAuthRepository {
  getUserFromCallback(req: Request): Promise<User>;
}
