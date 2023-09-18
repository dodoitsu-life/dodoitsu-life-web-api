import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';

import { User } from '@domain/user/user.entity';

export interface FindOptions {
  order?: {
    [P in keyof Dodoitsu]?: 'ASC' | 'DESC';
  };
  skip?: number;
  take?: number;
  user?: User;
}

export interface IDodoitsuRepository {
  find(options: FindOptions): Promise<Dodoitsu[]>;
  findOne(id: string, user?: User): Promise<Dodoitsu | null>;
  count(): Promise<number>;
  create(dodoitsu: CreateDodoitsuDto, author?: User): Promise<Dodoitsu>;
  save(dodoitsu: Dodoitsu): Promise<Dodoitsu>;
  like(dodoitsu: Dodoitsu, user: User): Promise<void>;
  unlike(dodoitsu: Dodoitsu, user: User): Promise<void>;
}
export const SYMBOL = Symbol('IDodoitsuRepository');
