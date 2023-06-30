import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ITodoRepository } from '../../../domain/todo/todo.repository.interface';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Todo } from '../../../domain/todo/todo.entity';
import { CreateTodoDto } from '../../../application/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '../../../application/todo/dto/update-todo.dto';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.entityManager.find(Todo);
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.entityManager.findOne(Todo, { where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.contents = createTodoDto.contents;
    todo.complete = false;
    return await this.entityManager.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.entityManager.findOne(Todo, { where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    todo.title = updateTodoDto.title ?? todo.title;
    todo.contents = updateTodoDto.contents ?? todo.contents;
    todo.complete = updateTodoDto.complete ?? todo.complete;
    return await this.entityManager.save(todo);
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.entityManager.delete(Todo, id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
