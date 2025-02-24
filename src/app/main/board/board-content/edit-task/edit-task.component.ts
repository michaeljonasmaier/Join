import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../interfaces/task';
import { MatSelectModule, } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { GreyBackgroundComponent } from '../../../../shared/grey-background/grey-background.component';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule, GreyBackgroundComponent, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  dueDateFormGroup = new FormGroup({
    dueDate: new FormControl('2000-01-01') // Standardwert setzen
  });

  selectedPrio: string = "Medium";

  constructor() {
    
  }

  ngOnInit() {
    this.selectedPrio = this.task.prio;
    this.dueDateFormGroup.patchValue({ dueDate: '2010-01-01' });
    this.getDataFormat();
  }

  getDataFormat(){
    console.log(this.task.date);
  }

  changeSubtaskIcons() {
    console.log("changed")
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
  }

  selectPrio(prio: string) {
    this.selectedPrio = prio;
  }

  closeEdit() {
    this.close.emit();
  }

}
