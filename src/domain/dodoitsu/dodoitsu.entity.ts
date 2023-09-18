import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';
import { User } from '@domain/user/user.entity';

@Entity()
export class Dodoitsu {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column()
  content: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author?: User;

  @OneToMany(() => DodoitsuLike, (like) => like.dodoitsu)
  likes: DodoitsuLike[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;
}
