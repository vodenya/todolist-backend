import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { v4 as uuid } from 'uuid';
import { CreateTaskInput } from './task.input';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async getTask(id: string): Promise<Task> {
    return await this.taskRepository.findOne(id);
  }

  async getTasks(user: User): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { userId: user.id },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    const task = (await this.getTask(id));
    task.remove();
    return task;
  }

  async deleteAllTask(user: User): Promise<boolean> {
    const task = await this.taskRepository.find({
      where: { userId: user.id },
    });
    this.taskRepository.remove(task);
    return true;
  }

  async createTask(
    createTaskInput: CreateTaskInput,
    user: User,
  ): Promise<Task> {
    const { todo } = createTaskInput;

    const task = this.taskRepository.create({
      id: uuid(),
      todo,
      checked: false,
      addDate: new Date().toISOString(),
      user: user,
    });

    delete task.user;
    return this.taskRepository.save(task);
  }

  async editTask(
    id: string,
    todo: string,
  ): Promise<Task> {
    const task = await this.getTask(id);
    task.todo = todo;
    await task.save();
    return task;
  }

  async updateTaskStatus(
    id: string,
    checked: boolean,
  ): Promise<Task> {
    const task = await this.getTask(id);
    task.checked = checked;
    await task.save();
    return task;
  }
}
