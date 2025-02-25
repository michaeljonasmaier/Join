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

  ngOnInit() {
    this.selectedPrio = this.task.prio;
    this.dueDateFormGroup.patchValue({ dueDate: '2010-01-01' });
    this.getDataFormat();

    if (this.task) {
      this.updateTaskModel(this.task);
    }
  }

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

  toggleContactList() {
    this.contactListOpened = !this.contactListOpened;
  }

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

  getContacts() {
    return this.filterList();
  }

  getDataFormat() {
  }

  changeSubtaskIcons() {
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
  }

  selectPrio(prio: 'Urgent' | 'Medium' | 'Low') {
    console.log(prio)
    this.editedTask.prio = prio;
  }

  closeEdit() {
    this.close.emit();
  }

  assignContact(contact: Contact) {
    let index = this.task.assigned?.findIndex(assignedContact => assignedContact.id === contact.id);
    if (index !== undefined && index !== -1) {
      this.task.assigned?.splice(index, 1);
    } else {
      this.task.assigned?.push(contact);
    }
    this.taskService.updateTask(this.task, this.task.status);
  }

  isContactAssigned(contact: Contact) {
    let index = this.task.assigned?.findIndex(assignedContact => assignedContact.id === contact.id);
    if (index !== undefined && index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  acceptChanges() {
    this.taskService.updateCurrentTask(this.editedTask);
    this.taskService.updateTask(this.editedTask, this.task.status);
    this.closeEdit();
  }
}
