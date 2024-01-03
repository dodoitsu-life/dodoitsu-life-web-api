import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { CreateDodoitsuDto } from '@application/dodoitsu/dto/create-dodoitsu.dto';

import { User } from '@domain/user/user.entity';

import { Theme } from '@domain/theme/theme.entity';

export interface FindOptions {
  order?: {
    [P in keyof Dodoitsu]?: 'ASC' | 'DESC';
  };
  skip?: number;
  take?: number;
  orderDirection?: 'ASC' | 'DESC';
  where?: {
    [P in keyof Dodoitsu]?: any;
  };
}

export interface IDodoitsuRepository {
  find(options: FindOptions): Promise<Dodoitsu[]>;
  findOne(id: string): Promise<Dodoitsu | null>;
  findWithLikesOrder(options: FindOptions): Promise<Dodoitsu[]>;
  count(): Promise<number>;
  findByUser(options: FindOptions, userId: string): Promise<Dodoitsu[]>;
  countByUser(userId: string): Promise<number>;
  findLikedByUser(options: FindOptions, userId: string): Promise<Dodoitsu[]>;
  countLikedByUser(userId: string): Promise<number>;
  findByTheme(options: FindOptions, themeId: string): Promise<Dodoitsu[]>;
  countByTheme(themeId: string): Promise<number>;
  create(
    dodoitsu: CreateDodoitsuDto,
    author?: User,
    theme?: Theme,
  ): Promise<Dodoitsu>;
  save(dodoitsu: Dodoitsu): Promise<Dodoitsu>;
  like(dodoitsu: Dodoitsu, user: User): void;
  unlike(dodoitsu: Dodoitsu, user: User): void;
  didUserLike(dodoitsuId: string, userId: string): Promise<boolean>;
}
export const SYMBOL = Symbol('IDodoitsuRepository');
