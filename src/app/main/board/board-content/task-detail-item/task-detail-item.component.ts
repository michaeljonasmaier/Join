import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GreyBackgroundComponent } from '../../../../shared/grey-background/grey-background.component';
import { Task } from '../../../../interfaces/task';

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

  closeDetail() {
    this.close.emit();
  }
}
