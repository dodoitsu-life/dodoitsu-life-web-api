import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  startDate;

  @Column({ type: 'timestamp' })
  endDate;
}
