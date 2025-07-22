import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}

  create(todo: Partial<Todo>) {
    const newTodo = this.todoRepo.create(todo);
    return this.todoRepo.save(newTodo);
  }

  findAll() {
    return this.todoRepo.find();
  }

  findOne(id: number) {
    return this.todoRepo.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<Todo>) {
    await this.todoRepo.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.todoRepo.delete(id);
  }
}
