import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { User } from '@domain/user/user.entity';
import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';

@Entity()
export class DodoitsuLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Dodoitsu, (dodoitsu) => dodoitsu.id)
  @JoinColumn()
  dodoitsu: Dodoitsu;
}
