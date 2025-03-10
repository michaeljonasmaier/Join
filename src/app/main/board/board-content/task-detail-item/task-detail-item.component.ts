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

  /**
   * subscribes the current task status
   */
  ngOnInit() {
    this.taskService.currentTask$.subscribe(updatedTask => {
      if (updatedTask) {
        this.task = updatedTask;
      }
    });
  }

  /**
   * calls delete task in task Service and close detail window
   */
  deleteTask() {
    this.taskService.deleteTask(this.task.id);
    this.closeDetail();
  }

  /**
   * closes the detail window with little timeout for animation to finish
   */
  closeDetail() {
    this.active = false;
    setTimeout(() => {
      this.close.emit();
    }, 300);
  }
    
  /**
   * unchecks a subtask
   * @param {number} index - index of subtask that gets unchecked
   */
  uncheckSubtask(index: number) {
    if (this.task.subtasks) {
      this.task.subtasks[index].taskDone = false;
      this.taskService.updateTask(this.task, this.task.status);
    }
  }

  /**
   * checks a subtask
   * @param {number} index - index of subtask that gets checked 
   */
  checkSubtask(index: number) {
    if (this.task.subtasks) {
      this.task.subtasks[index].taskDone = true;
      this.taskService.updateTask(this.task, this.task.status);
    }
  }

  /**
   * styles a date to dd.mm.yyyy
   * @param {string} date - the string of the date that needs to be styled
   * @returns {string} - styled date
   */
  styleDate(date: string) {
    let [year, month, day] = date.split("-");
    let formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  /**
   * opens the edit window with called task
   */
  openTaskEdit() {
    this.taskEditClicked.emit(this.task);
  }
}
