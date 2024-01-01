import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  startDate;

  @Column({ type: 'timestamp' })
  endDate;
}
