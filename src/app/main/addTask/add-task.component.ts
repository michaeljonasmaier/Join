import { Component, HostListener} from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FirebaseTasksService } from '../../services/firebase-tasks.service';
import { Contact } from '../../interfaces/contact';
import { FirebaseContactsService } from '../../services/firebase-contacts.service';
import {MatSelectModule, } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ModalWindowService } from '../../services/modal-window/modal-window.service';

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
  taskForm: FormGroup;
  users: Contact[] = [];
  categories = ['Technical Task', 'User Story'];
  priority: 'Urgent' | 'Medium' | 'Low' = 'Medium';
  subtasks: string [] = [];
  myInitials: string[] = [];
  myColors: string[] = [];
  subtasksObj: {subtask: string, taskDone: boolean} [];
  today: string = new Date().toISOString().split('T')[0];
  subtaskIconShown = false;

  constructor(private fb: FormBuilder, private taskService: FirebaseTasksService, private contactService: FirebaseContactsService, public modalWindowService: ModalWindowService) {
    this.subtasksObj = [];

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
    this.subtasks = [];
    this.myColors = [];
    this.myInitials = [];
    
  }

  saveSubtask(){
    let myInput = document.getElementById('subtasks') as HTMLInputElement;
    if (!myInput) return;
    let myValue = myInput.value;
    if(myValue == ""){
      myInput.placeholder = "Value required";
      document.getElementById('value-required')?.classList.remove('d-none')
    } else{
      this.subtasks.push(myValue);
      this.cleanSubtask()
    }
    
  }
  cleanSubtask(){
    let myInput = document.getElementById('subtasks') as HTMLInputElement;
    if (!myInput) return;
    myInput.value = ""
  }

  toggleSubtaskIcons(event: Event) {
    this.subtaskIconShown = true;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeSubtaskIcons(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.subtask-input')) {
      this.subtaskIconShown = false;
    }
  }


  getInitials(initials: string){
    const currentInitials = initials;
    let isInitialsHere = this.myInitials.indexOf(currentInitials);
    if(isInitialsHere === -1){
      this.myInitials.push(currentInitials)
    }else{
      this.myInitials.splice(isInitialsHere, 1)
      this.myColors.splice(isInitialsHere, 1)
    }
  }

  getColor(color: string | undefined){
    if(color === undefined){
      this.myColors.push("#D72638")
    }else{
      this.myColors.push(color)
    }
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
        subtasks: this.setSubtaskObjects(),
        assigned: formValue.assigned,
        id: this.generateUniqueId()
      };
      this.sendNotification();
      await this.taskService.addTask(newTask);
      this.onClear();

    }
  }

  setSubtaskObjects(){
    this.subtasks.forEach(subtask => {
      this.subtasksObj.push({subtask: subtask, taskDone: false});
    });

    return this.subtasksObj;
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  changePriority(priority: string){
    this.resetAllPriority();
    let newPriority = priority.toLowerCase();
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
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
    document.getElementById('subtasks')?.focus();
  }

  sendNotification(){
    console.log(document.getElementById("notification"));
    setTimeout(() => this.modalWindowService.sendNotification("notification"), 0);
  }

  editSubtask(subtask: string){
    document.getElementById('subtask-container-' + subtask)?.classList.add('d-none');
    document.getElementById('single-subtask-container-' + subtask)?.classList.remove('d-none');
  }

  closeSubtaskEditor(subtask:string){
    document.getElementById('subtask-container-' + subtask)?.classList.remove('d-none');
    document.getElementById('single-subtask-container-' + subtask)?.classList.add('d-none');
  }

  deleteSubtask(subtask: string){
    let mySubtask = this.findSubtask(subtask);
    this.subtasks.splice(mySubtask, 1);
    this.closeSubtaskEditor(subtask);
  }

  submitEditSubtask(subtask: string){
    let mySubtaskIndex = this.findSubtask(subtask);
    let currentInput = document.getElementById(subtask + "-value") as HTMLInputElement;
    let newSubtaskValue = currentInput.value;
    this.subtasks[mySubtaskIndex] = newSubtaskValue;
    this.closeSubtaskEditor(subtask);
  }

  findSubtask(subtask: string){
    const currentSubtask = subtask;
    let subtaskIndex = this.subtasks.indexOf(currentSubtask);
    return subtaskIndex;
  }
}
