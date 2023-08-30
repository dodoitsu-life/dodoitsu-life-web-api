import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Dodoitsu {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column()
  content: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;
}
