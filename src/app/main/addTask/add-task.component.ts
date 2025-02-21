import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FirebaseTasksService } from '../../services/firebase-tasks.service';
import { Contact } from '../../interfaces/contact';
import { FirebaseContactsService } from '../../services/firebase-contacts.service';
import {MatSelectModule, } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule,FormsModule, ReactiveFormsModule],

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  /*
<<<<<<< HEAD
  task: Task [] = [];
  taskForm: FormGroup;
  //subtasks: FormArray;

  users = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ];
  categories = ['Work', 'Personal', 'Other'];


  constructor(private fb: FormBuilder) {
=======*/
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  taskForm: FormGroup;
  users: Contact[] = [];
  categories = ['Technical Task', 'User Story'];
  priority: 'Urgent' | 'Medium' | 'Low' = 'Medium';

  constructor(private fb: FormBuilder, private taskService: FirebaseTasksService, private contactService: FirebaseContactsService) {

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

  getUserList(){
    return this.contactService.contacts;
  }

  setPriority(priority: 'Urgent' | 'Medium' | 'Low') {
    this.priority = priority;
    this.taskForm.patchValue({ priority });
  }

  onClear() {
    this.taskForm.reset();
    this.priority = 'Medium';
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const newTask: Task = {
        title: formValue.title,
        date: formValue.dueDate,
        status: 'toDo',
        category: formValue.category,
        description: formValue.description,
        prio: formValue.priority,
        subtasks: [],//formValue.subtasks?.split(',').map((s: string) => s.trim()) || [],
        assigned: this.users.filter(user => formValue.assigned.includes(user.id)),
        id: this.generateUniqueId()
      };
      await this.taskService.addTask(newTask);
      this.onClear();

      console.log('Task Submitted:', newTask);
    }
  }
 /*
  createTask(){
    if (this.taskForm.valid) {
      console.log('Task Submitted:', this.taskForm.value);
    }
  }*/

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
