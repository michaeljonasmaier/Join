import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Task } from '../../../../interfaces/task';
import { MatSelectModule, } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { GreyBackgroundComponent } from '../../../../shared/grey-background/grey-background.component';
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { Contact } from '../../../../interfaces/contact';
import { FirebaseContactsService } from '../../../../services/firebase-contacts.service';
import { FirebaseTasksService } from '../../../../services/firebase-tasks.service';
import { filter } from 'rxjs';
import { JoinBtnComponent } from '../../../../shared/join-btn/join-btn.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule, GreyBackgroundComponent, ReactiveFormsModule, FormsModule, JoinBtnComponent],
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
  contactListOpened: boolean = false;
  filteredContactList: Contact[] = [];
  contactInputValue: string = '';
  subtaskInputValue: string = '';
  subtaskEdits: string[] = [];
  isFocused: boolean[] = [];
  editedTask: Task = {
    title: "",
    description: "",
    date: "",
    status: "toDo",
    category: "User Story",
    id: "",
    prio: "Medium",
    subtasks: [],
  }

  constructor(private contactService: FirebaseContactsService, private taskService: FirebaseTasksService) {
  }

  /**
   * sets default values of task (prio, due date, subtasks)
   */

  ngOnInit() {
    this.selectedPrio = this.task.prio;
    this.dueDateFormGroup.patchValue({ dueDate: '2010-01-01' });
    if (this.task) {
      this.updateTaskModel(this.task);
      this.getAllSubtasks();
    }
  }

  /**
   * pushes all edited subtasks to the subtasksedits array
   */
  
  getAllSubtasks(){
    if(this.editedTask.subtasks){
      this.editedTask.subtasks.forEach(element => {
        this.subtaskEdits.push(element.subtask);
      });
    }
  }

  /**
   * sets subtask focused
   * @param {number} index - index of subtask that is focused
   */

  onFocus(index: number){
    this.isFocused[index] = true;
  }

  /**
   * changes edited Task on blur and sets it false
   * @param {number} index - index of subtask
   */

  onBlur(index: number) {
    this.isFocused[index] = false;
    if(this.editedTask.subtasks){
      this.editedTask.subtasks[index] = {subtask: this.subtaskEdits[index], taskDone: false};    
    }
  }

  /**
   * updates the Task with its eventually changed values
   * @param {Task} task - current task
   */

  updateTaskModel(task: Task) {
    this.editedTask = {
      title: task.title,
      description: task.description || "",
      date: task.date,
      status: task.status,
      category: task.category,
      id: task.id,
      prio: task.prio,
      subtasks: task.subtasks,
      assigned: task.assigned,
    };
  }

  /**
   * changes the contactsListOpened status
   */

  toggleContactList() {
    this.contactListOpened = !this.contactListOpened;
  }

  /**
   * filters the contact list to the all contacts its searched for (name and surname)
   * @returns {Contact []} - the filtered Contact List
   */

  filterList() {
    this.filteredContactList = this.contactService.contacts;
    if (this.contactInputValue != '') {
      let filteredContacts = this.filteredContactList.filter(contact => {
        let fullName = (contact.name + ' ' + contact.surname).toLowerCase();
        return fullName.includes(this.contactInputValue);
      });
      
      this.filteredContactList = filteredContacts;
      return this.filteredContactList
    } else {
      return this.filteredContactList;
    }
  }

  /**
   * calls the filtered List
   * @returns the filtered list
   */

  getContacts() {
    return this.filterList();
  }

  /**
   * changes the subtask button 
   */

  changeSubtaskIcons() {
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
  }

  /**
   * sets the prio of the current task
   * @param {'Urgent' | 'Medium' | 'Low'} prio - the prio
   */

  selectPrio(prio: 'Urgent' | 'Medium' | 'Low') {
    this.editedTask.prio = prio;
  }

  /**
   * closes the edit window
   */

  closeEdit() {
    this.close.emit();
  }

  /**
   * set a contact as assigned if it isnt already and if then deassign it
   * @param {Contact} contact - the contact that get assigned of deassigned to task
   */

  assignContact(contact: Contact) {
    let index = this.task.assigned?.findIndex(assignedContact => assignedContact.id === contact.id);
    if (index !== undefined && index !== -1) {
      this.task.assigned?.splice(index, 1);
    } else {
      this.task.assigned?.push(contact);
    }
    this.taskService.updateTask(this.task, this.task.status);
  }

  /**
   * checks if a contact is assigned to the current task
   * @param {Contact} contact - the contact that gets checked
   * @returns {boolean} - true if contact is already assigned
   */

  isContactAssigned(contact: Contact): boolean {
    let index = this.task.assigned?.findIndex(assignedContact => assignedContact.id === contact.id);
    if (index !== undefined && index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * calls update functions and closes the edit window
   */

  acceptChanges() {
    this.taskService.updateCurrentTask(this.editedTask);
    this.taskService.updateTask(this.editedTask, this.task.status);
    this.closeEdit();
  }

  /**
   * clears input
   */

  clearSubtaskInput() {
    this.subtaskInputValue = "";
  }

  /**
   * adds a subtask to the task and clears the input
   */

  addSubtask() {
    this.editedTask.subtasks?.push({ subtask: this.subtaskInputValue, taskDone: false });
    this.subtaskEdits.push(this.subtaskInputValue);
    this.subtaskInputValue = "";
  }

  /**
   * deletes a specific subtask
   * @param subtaskItem - the subtask that gets deleted from task
   */

  deleteSubtask(subtaskItem: { subtask: string, taskDone: boolean }) {
    let index =  this.editedTask.subtasks?.findIndex(item => item.subtask === subtaskItem.subtask);
    if (index !== undefined && index !== -1) {
      this.editedTask.subtasks?.splice(index, 1);
    }
  }
}
