import { Dodoitsu } from './dodoitsu.entity';
import { CreateDodoitsuDto } from 'src/application/dodoitsu/dto/create-dodoitsu.dto';

export interface FindOptions {
  order?: {
    [P in keyof Dodoitsu]?: 'ASC' | 'DESC';
  };
  skip?: number;
  take?: number;
}

export interface IDodoitsuRepository {
  find(options: FindOptions): Promise<Dodoitsu[]>;
  findOne(id: number): Promise<Dodoitsu | null>;
  count(): Promise<number>;
  create(dodoitsu: CreateDodoitsuDto): Promise<Dodoitsu>;
  save(dodoitsu: Dodoitsu): Promise<Dodoitsu>;
}
export const SYMBOL = Symbol('IDodoitsuRepository');
