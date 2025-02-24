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
  subtasks: string [] = [];
  myInitials: string[] = [];

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
    this.changePriority(priority);
  }

  onClear() {
    this.taskForm.reset();
    this.priority = 'Medium';
  }

  saveSubtask(){
    let myInput = document.getElementById('subtasks') as HTMLInputElement;
    if (!myInput) return;
    let myValue = myInput.value;
    this.subtasks.push(myValue);
  }

  getInitials(initials: string){
    const currentInitials = initials;
    initials.indexOf(initials)
    let isInitialsHere = this.myInitials.indexOf(currentInitials);
    if(isInitialsHere === -1){
      this.myInitials.push(currentInitials)
    }else{
      this.myInitials.splice(isInitialsHere, 1)
    }
  }
  

  async onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      console.log()

      const newTask: Task = {
        title: formValue.title,
        date: formValue.dueDate,
        status: 'toDo',
        category: formValue.category,
        description: formValue.description,
        prio: formValue.priority,
        subtasks: [formValue.subtasks],//formValue.subtasks?.split(',').map((s: string) => s.trim()) || [],
        assigned: formValue.assigned,//this.users.filter(user => formValue.assigned.includes(user.id)),
        id: this.generateUniqueId()
      };
      //this.subtasks = newTask.subtasks;
      console.log(newTask.assigned)
      //es ist unten deaktiviert, um Kontakte zu reparieren und den Taffel nicht zu verschmutzen
      //await this.taskService.addTask(newTask);
      //this.onClear();

      console.log('Task Submitted:', newTask);
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  changePriority(priority: string){
    this.resetAllPriority();
    let newPriority = priority.toLowerCase();
    console.log(newPriority)
    document.getElementById(newPriority)?.classList.add(newPriority)
  }

  resetAllPriority(){
    this.resetSinglePriority('urgent');
    this.resetSinglePriority('medium');
    this.resetSinglePriority('low');
  }
  resetSinglePriority(priority: string){
    document.getElementById(priority)?.classList.remove(priority);
  }
  changeSubtaskIcons(){
    console.log("changed")
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
  }
}
