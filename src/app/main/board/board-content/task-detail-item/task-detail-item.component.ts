import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GreyBackgroundComponent } from '../../../../shared/grey-background/grey-background.component';
import { Task } from '../../../../interfaces/task';
import { FirebaseTasksService } from '../../../../services/firebase-tasks.service';

@Component({
  selector: 'app-task-detail-item',
  standalone: true,
  imports: [GreyBackgroundComponent],
  templateUrl: './task-detail-item.component.html',
  styleUrl: './task-detail-item.component.scss'
})
export class TaskDetailItemComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();

  @Output() taskEditClicked = new EventEmitter<Task>();
  
  constructor(private taskService: FirebaseTasksService){

  }

  ngOnInit(){
    this.taskService.currentTask$.subscribe(updatedTask => {
      if (updatedTask) {
        this.task = updatedTask;
      }
    });
  }

  deleteTask(){
    this.taskService.deleteTask(this.task.id);
    this.closeDetail();
  }

  closeDetail() {
    this.close.emit();
  }

  uncheckSubtask(index: number) {
    if (this.task.subtasks) {
      this.task.subtasks[index].taskDone = false;
      this.taskService.updateTask(this.task, this.task.status);
    }
  }

  checkSubtask(index: number) {
    if (this.task.subtasks) {
      this.task.subtasks[index].taskDone = true;
      this.taskService.updateTask(this.task, this.task.status);
    }
  }

  openTaskEdit() {
    this.taskEditClicked.emit(this.task);
  }
}
