import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task';

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

  openTaskDetailItem() {
    this.taskClicked.emit(this.task);
  }
}
