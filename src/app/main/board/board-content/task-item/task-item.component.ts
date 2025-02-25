import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task';
import { FirebaseTasksService } from '../../../../services/firebase-tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  @Input() task!: Task
  @Output() taskClicked = new EventEmitter<Task>();

  constructor(private taskService: FirebaseTasksService){

  }

  openTaskDetailItem() {
    this.taskClicked.emit(this.task);
  }

  getDoneSubtasks(){
    let num = 0;
    if(this.task.subtasks){
      this.task.subtasks.forEach(element => {
        if(element.taskDone){
          num++;
        }
      });
    }
    return num;
  }
}
