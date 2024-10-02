import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter(t => t.id === id);

    if (foundTask.length > 0) {
      return foundTask[0]
    }

    throw new HttpException(`Task id #${id} not found`, HttpStatus.NOT_FOUND);
  }

  update(task: TaskDto){
    let taskIndex = this.tasks.findIndex(t => t.id === task.id);

    if(taskIndex >= 0){
      this.tasks[taskIndex] = task
      return;
    }

    throw new HttpException(`Task ${task.id} not found`, HttpStatus.BAD_REQUEST);

  }
}
