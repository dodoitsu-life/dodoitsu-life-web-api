import { Theme } from '@domain/theme/theme.entity';

export interface FindOptions {
  skip?: number;
  take?: number;
  where?: {
    [P in keyof Theme]?: any;
  };
}

export interface IThemeRepository {
  findOne(id: number): Promise<Theme | null>;
  count(): Promise<number>;
  countCurrentOrPast(): Promise<number>;
  findCurrentOrPast(options: FindOptions): Promise<Theme[]>;
}
export const SYMBOL = Symbol('IThemeRepository');
