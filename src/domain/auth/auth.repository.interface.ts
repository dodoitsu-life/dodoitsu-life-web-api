import { User } from '../user/user.entity';

export const SYMBOL = Symbol('IAuthRepository');

export interface IAuthRepository {
  getUserFromCallback(req: Request): Promise<User>;
}
