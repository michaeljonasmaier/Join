import { Component, Input } from '@angular/core';
import { Task } from '../../../../interfaces/task';
import {MatSelectModule, } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  @Input() task!: Task;

  constructor(){
    console.log("edit task erstellt");
  }

}
