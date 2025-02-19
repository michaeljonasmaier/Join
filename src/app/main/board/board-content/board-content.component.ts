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

  getTasks(){
    return this.tasksService.tasks;
  }

}
