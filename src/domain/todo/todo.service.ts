import { Injectable, Inject } from '@nestjs/common';
import { ITodoRepository, SYMBOL } from './todo.repository.interface';
import { Todo } from './todo.entity';
import { CreateTodoDto } from '../../application/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '../../application/todo/dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(SYMBOL)
    private readonly todoRepository: ITodoRepository,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async findOne(id): Promise<Todo | null> {
    return this.todoRepository.findOne(id);
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.create(createTodoDto);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return this.todoRepository.update(id, updateTodoDto);
  }

  async delete(id: number): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
