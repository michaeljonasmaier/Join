import { Component, inject } from '@angular/core';
import { FirebaseTasksService } from '../../../services/firebase-tasks.service';
import { Task } from '../../../interfaces/task';
import { TaskItemComponent } from './task-item/task-item.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropListGroup,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TaskDetailItemComponent } from './task-detail-item/task-detail-item.component';

@Component({
  selector: 'app-board-content',
  standalone: true,
  imports: [TaskItemComponent, CdkDropList, CdkDrag, CdkDropListGroup, TaskDetailItemComponent],
  templateUrl: './board-content.component.html',
  styleUrl: './board-content.component.scss'
})
export class BoardContentComponent {
  tasks: Task[] = [];
  selectedTask?: Task;

  data = inject(FirebaseTasksService);
  constructor(private tasksService: FirebaseTasksService){
    
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const currentTask = event.container.data[event.currentIndex];
      this.data.updateTask(currentTask, event.container.id);
    }
    console.log(this.data);
  }
  
  openTaskDetail(task: Task){
    this.selectedTask = task;
  }

  closeTaskDetail() {
    this.selectedTask = undefined;
  }
}
