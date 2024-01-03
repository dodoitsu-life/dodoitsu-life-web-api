import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Theme {
  @PrimaryColumn('uuid')
  id: string = uuidv4();

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  startDate;

  @Column({ type: 'timestamp' })
  endDate;
}
