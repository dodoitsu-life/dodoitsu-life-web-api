import { User } from '@domain/user/user.entity';

export const SYMBOL = Symbol('IUserRepository');

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findOne(criteria: Partial<User>): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
