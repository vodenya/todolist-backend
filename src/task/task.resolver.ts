import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/user/auth-guard';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Task } from './task.entity';
import { CreateTaskInput } from './task.input';
import { TaskService } from './task.service';

@Resolver((of) => Task)
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query((returns) => Task)
  task(@Args('id') id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Query((returns) => [Task])
  tasks(@GetUser() user: User): Promise<Task[]> {
    return this.taskService.getTasks(user);
  }

  @Mutation((returns) => Boolean)
  deleteTasks(@GetUser() user: User): Promise<boolean> {
    return this.taskService.deleteAllTask(user);
  }

  @Mutation((returns) => Task)
  createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskInput, user);
  }

  @Mutation((returns) => Task)
  deleteTask(@Args('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }

  @Mutation((returns) => Task)
  editTask(
    @Args('id') id: string,
    @Args('todo') todo: string,
  ): Promise<Task> {
    return this.taskService.editTask(id, todo);
  }

  @Mutation((returns) => Task)
  updateTaskStatus(
    @Args('id') id: string,
    @Args('checked') checked: boolean,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, checked);
  }
}
