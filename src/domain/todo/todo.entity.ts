import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  title: string;

  @Column()
  complete: boolean;

  @Column()
  contents: string;
}
