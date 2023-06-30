import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from '../../domain/todo/todo.service';
import { TodoRepository } from '../../infrastructure/orm/todo/todo.repository';
import { SYMBOL } from '../../domain/todo/todo.repository.interface';
import { Todo } from '../../domain/todo/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: SYMBOL,
      useClass: TodoRepository,
    },
  ],
})
export class TodoModule {}
