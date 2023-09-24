import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';

import { User } from '@domain/user/user.entity';

export interface FindOptions {
  order?: {
    [P in keyof Dodoitsu]?: 'ASC' | 'DESC';
  };
  skip?: number;
  take?: number;
  orderDirection?: 'ASC' | 'DESC';
}

export interface IDodoitsuRepository {
  find(options: FindOptions): Promise<Dodoitsu[]>;
  findOne(id: string): Promise<Dodoitsu | null>;
  findWithLikesOrder(options: FindOptions): Promise<Dodoitsu[]>;
  count(): Promise<number>;
  create(dodoitsu: CreateDodoitsuDto, author?: User): Promise<Dodoitsu>;
  save(dodoitsu: Dodoitsu): Promise<Dodoitsu>;
  like(dodoitsu: Dodoitsu, user: User): void;
  unlike(dodoitsu: Dodoitsu, user: User): void;
  didUserLike(dodoitsuId: string, userId: string): Promise<boolean>;
}
export const SYMBOL = Symbol('IDodoitsuRepository');
