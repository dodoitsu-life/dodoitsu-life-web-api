import { Todo } from './todo.entity';
import { CreateTodoDto } from 'src/application/todo/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/application/todo/dto/update-todo.dto';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findOne(id: number): Promise<Todo | null>;
  create(todo: CreateTodoDto): Promise<Todo>;
  update(id: number, todo: UpdateTodoDto): Promise<Todo>;
  delete(id: number): Promise<void>;
}
export const SYMBOL = Symbol('ITodoRepository');
