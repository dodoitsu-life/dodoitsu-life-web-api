import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { User } from '@domain/user/user.entity';
import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';

@Entity()
export class DodoitsuLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Dodoitsu, (dodoitsu) => dodoitsu.likes)
  @JoinColumn()
  dodoitsu: Dodoitsu;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;
}
