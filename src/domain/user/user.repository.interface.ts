import { User } from './user.entity';

export const SYMBOL = Symbol('IUserRepository');

export interface IUserRepository {
  findByTwitterId(twitterId: string): Promise<User | undefined>;
  create(user: Partial<User>): Promise<User>;
}
