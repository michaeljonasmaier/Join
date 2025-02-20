import { Component } from '@angular/core';
import { FirebaseTasksService } from '../../../services/firebase-tasks.service';
import { Task } from '../../../interfaces/task';
import { TaskItemComponent } from './task-item/task-item.component';
@Component({
  selector: 'app-board-content',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './board-content.component.html',
  styleUrl: './board-content.component.scss'
})
export class BoardContentComponent {
  tasks: Task[] = [];
  constructor(private tasksService: FirebaseTasksService){

  }

  getTasks(status: string){
    if(status == 'To do'){
      return this.tasksService.toDo;
    } else if(status == 'In progress'){
      return this.tasksService.inProgress;
    } else if(status == 'Await feedback'){
      return this.tasksService.awaitFeedback;
    } else {
      return this.tasksService.done;
    }
  }
}
