import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Post,
} from '@nestjs/common';
import { TodoService } from '../../domain/todo/todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '../../domain/todo/todo.entity';
import { ApiResponse } from '../../common/ApiResponse';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<Todo[]>> {
    const todos = await this.todoService.findAll();
    return ApiResponse.success(todos);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<ApiResponse<Todo | null>> {
    const todo = await this.todoService.findOne(id);
    return ApiResponse.success(todo, "Todo doesn't exist.aaa");
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<ApiResponse<Todo>> {
    const todo = await this.todoService.create(createTodoDto);
    return ApiResponse.success(todo);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<ApiResponse<Todo>> {
    const todo = await this.todoService.update(id, updateTodoDto);
    return ApiResponse.success(todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number): Promise<void> {
    return await this.todoService.delete(id);
  }
}
