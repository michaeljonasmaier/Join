import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule ,ReactiveFormsModule , Validators ,FormGroup ,FormBuilder, FormArray} from '@angular/forms';


@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  task: Task [] = [];
  taskForm: FormGroup;
  //subtasks: FormArray;

  users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ];
  categories = ['Work', 'Personal', 'Other'];


  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assigned: [''],
      dueDate: ['', Validators.required],
      category: ['' , Validators.required ],
      subtasks: this.fb.array([])
    });
  }

  setPriority(priority: string) {
    console.log('Priority set to:', priority);
  }

  onClear() {
    this.taskForm.reset();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Task Submitted:', this.taskForm.value);
    }
  }
 /*
  createTask(){
    if (this.taskForm.valid) {
      console.log('Task Submitted:', this.taskForm.value);
    }
  }*/
}
