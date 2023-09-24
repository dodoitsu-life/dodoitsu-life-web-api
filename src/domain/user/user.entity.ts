import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column({ unique: true })
  twitterId: string;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;

  @OneToMany(() => DodoitsuLike, (like) => like.user)
  likes: DodoitsuLike[];

  @Column({ nullable: true })
  refreshToken: string;
}
