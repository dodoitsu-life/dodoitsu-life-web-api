import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dodoitsu {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt;
}
