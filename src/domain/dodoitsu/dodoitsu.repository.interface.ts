import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';
import { ResponseDodoitsuDto } from '@application/dodoitsu/dto/response-dodoitsu.dto';

import { User } from '@domain/user/user.entity';

export interface FindOptions {
  order?: {
    [P in keyof Dodoitsu]?: 'ASC' | 'DESC';
  };
  skip?: number;
  take?: number;
}

export interface IDodoitsuRepository {
  find(options: FindOptions): Promise<ResponseDodoitsuDto[]>;
  findOne(id: string): Promise<ResponseDodoitsuDto | null>;
  count(): Promise<number>;
  create(dodoitsu: CreateDodoitsuDto, author?: User): Promise<Dodoitsu>;
  save(dodoitsu: Dodoitsu): Promise<ResponseDodoitsuDto>;
}
export const SYMBOL = Symbol('IDodoitsuRepository');
