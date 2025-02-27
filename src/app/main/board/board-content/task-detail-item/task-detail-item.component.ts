import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { GreyBackgroundComponent } from '../../../../shared/grey-background/grey-background.component';
import { Task } from '../../../../interfaces/task';
import { FirebaseTasksService } from '../../../../services/firebase-tasks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail-item',
  standalone: true,
  imports: [GreyBackgroundComponent, CommonModule],
  templateUrl: './task-detail-item.component.html',
  styleUrl: './task-detail-item.component.scss'
})
export class TaskDetailItemComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() taskEditClicked = new EventEmitter<Task>();

  active: boolean = true;

  constructor(private taskService: FirebaseTasksService) {

  }

  ngOnInit() {
    this.taskService.currentTask$.subscribe(updatedTask => {
      if (updatedTask) {
        this.task = updatedTask;
      }
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id);
    this.closeDetail();
  }

  closeDetail() {
    this.active = false;
    setTimeout(() => {
      this.close.emit();
    }, 300);
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

  styleDate(date: string) {
    let [year, month, day] = date.split("-");
    let formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  openTaskEdit() {
    this.taskEditClicked.emit(this.task);
  }
}
