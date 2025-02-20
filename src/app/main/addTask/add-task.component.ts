import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  taskForm: FormGroup;
  users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ];
  categories = ['Technical Task', 'User Story'];
  priority: 'Urgent' | 'Medium' | 'Low' = 'Medium';

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assigned: [[]],
      dueDate: ['', Validators.required],
      category: ['', Validators.required],
      subtasks: [[]],
      priority: [this.priority, Validators.required]
    });
  }

  setPriority(priority: 'Urgent' | 'Medium' | 'Low') {
    this.priority = priority;
    this.taskForm.patchValue({ priority });
  }

  onClear() {
    this.taskForm.reset();
    this.priority = 'Medium';
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const newTask: Task = {
        title: formValue.title,
        date: formValue.dueDate,
        status: 'To do',
        category: formValue.category,
        description: formValue.description,
        prio: formValue.priority,
        subtasks: formValue.subtasks?.split(',').map((s: string) => s.trim()) || [],
        assigned: this.users.filter(user => formValue.assigned.includes(user.id)),
        id: this.generateUniqueId()
      };

      console.log('Task Submitted:', newTask);
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
