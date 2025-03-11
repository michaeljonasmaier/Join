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

  /**
   * Creates a new instance of the AddTaskComponent.
   *
   * @param fb The form builder used to create the form.
   * @param taskService The task service used to add the task to the database.
   * @param contactService The contact service used to get the list of users.
   * @param modalWindowService The modal window service used to show the modal window.
   */

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

/**
 * Retrieves the list of contacts from the contact service.
 * @returns {Contact[]} - An array of Contact objects.
 */

  getUserList(){
    return this.contactService.contacts;
  }

  /**
   * Sets the priority of the task to the given value.
   * 
   * Also updates the form value and calls the changePriority function.
   * @param priority The new priority of the task.
   */

  setPriority(priority: 'Urgent' | 'Medium' | 'Low') {
    this.priority = priority;
    this.taskForm.patchValue({ priority });
    this.changePriority(priority);
  }

  /**
   * Resets the form and clears all the data in the component.
   * Used when the user clicks the 'Clear' button.
   */

  onClear() {
    this.taskForm.reset();
    this.priority = 'Medium';
    this.subtasks = [];
    this.myColors = [];
    this.myInitials = [];
  }

/**
 * Saves a new subtask from the input field. 
 * If the input value is empty, displays a placeholder and a warning message.
 * Otherwise, adds the subtask to the list and clears the input field.
 */

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

/**
 * Clears the value of the subtask input field.
 * If the input field is not found, the function exits early.
 */

  cleanSubtask(){
    let myInput = document.getElementById('subtasks') as HTMLInputElement;
    if (!myInput) return;
    myInput.value = ""
  }

  /**
   * Toggles the visibility of the subtask icons.
   * If the event target is not the subtask input field, the icons are hidden.
   * If the event target is the subtask input field, the icons are shown.
   * @param event The event that triggered the toggle.
   */

  toggleSubtaskIcons(event: Event) {
    this.subtaskIconShown = true;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])

  /**
   * Hides the subtask icons if the event target is not the subtask input field.
   * @param event The event that triggered the hiding.
   */

  closeSubtaskIcons(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.subtask-input')) {
      this.subtaskIconShown = false;
    }
  }


/**
 * Toggles the presence of the given initials in the myInitials array.
 * If the initials are not present, they are added. If they are present,
 * they are removed along with their corresponding color from myColors array.
 * 
 * @param initials - The initials to be toggled in the myInitials array.
 */

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

  /**
   * Adds the given color to the myColors array.
   * If the color is undefined, the default color "#D72638" is added instead.
   * @param color The color to be added to the myColors array.
   */

  getColor(color: string | undefined){
    if(color === undefined){
      this.myColors.push("#D72638")
    }else{
      this.myColors.push(color)
    }
  }
  

/**
 * Submits the task form if it is valid, creates a new task object,
 * sends a notification, adds the task to the task service, and clears the form.
 * The new task includes title, date, status, category, description, priority,
 * subtasks, assigned contacts, and a unique ID.
 */

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

/**
 * Converts the list of subtasks into an array of subtask objects,
 * where each object contains the subtask text and a taskDone flag
 * set to false. Returns the array of subtask objects.
 * 
 * @returns An array of objects representing subtasks with taskDone status.
 */

  setSubtaskObjects(){
    this.subtasks.forEach(subtask => {
      this.subtasksObj.push({subtask: subtask, taskDone: false});
    });

    return this.subtasksObj;
  }

  /**
   * Generates a unique ID consisting of 9 alphanumeric characters.
   * The ID is generated by taking the string representation of a random
   * number and then taking a substring from the 2nd character onwards.
   * @returns A unique ID as a string.
   */

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

/**
 * Changes the priority of a task by resetting all priorities and
 * adding a CSS class corresponding to the new priority.
 * Converts the given priority to lowercase and uses it to find
 * the corresponding HTML element by ID, then adds the priority
 * as a class to the element.
 * 
 * @param priority - The new priority to set, expected values are 'Urgent', 'Medium', or 'Low'.
 */

  changePriority(priority: string){
    this.resetAllPriority();
    let newPriority = priority.toLowerCase();
    document.getElementById(newPriority)?.classList.add(newPriority)
  }

/**
 * Resets all priorities by removing the corresponding CSS classes
 * from the relevant HTML elements. This is used to clear the
 * previously selected priority when the user selects a new one.
 */

  resetAllPriority(){
    this.resetSinglePriority('urgent');
    this.resetSinglePriority('medium');
    this.resetSinglePriority('low');
  }
  resetSinglePriority(priority: string){
    document.getElementById(priority)?.classList.remove(priority);
  }

/**
 * Changes the visibility of subtask icons by hiding the plus button
 * and showing the subtask buttons. Additionally, it sets the focus
 * on the subtask input field to facilitate user input.
 */

  changeSubtaskIcons(){
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
    document.getElementById('subtasks')?.focus();
  }

  /**
   * Sends a notification to the user by sliding down a notification bar with a message.
   * The notification is sent after a delay of 0 milliseconds.
   */

  sendNotification(){
    console.log(document.getElementById("notification"));
    setTimeout(() => this.modalWindowService.sendNotification("notification"), 0);
  }

/**
 * Switches the visibility of a subtask's container elements by hiding
 * the subtask display container and showing the input container for editing.
 * @param subtask The identifier of the subtask to be edited.
 */

  editSubtask(subtask: string){
    document.getElementById('subtask-container-' + subtask)?.classList.add('d-none');
    document.getElementById('single-subtask-container-' + subtask)?.classList.remove('d-none');
  }

  /**
   * Switches the visibility of a subtask's container elements by showing
   * the subtask display container and hiding the input container for editing.
   * @param subtask The identifier of the subtask to be edited.
   */

  closeSubtaskEditor(subtask:string){
    document.getElementById('subtask-container-' + subtask)?.classList.remove('d-none');
    document.getElementById('single-subtask-container-' + subtask)?.classList.add('d-none');
  }

/**
 * Deletes a specified subtask by its identifier.
 * Finds the index of the subtask, removes it from the subtasks list,
 * and closes the subtask editor for that subtask.
 * @param subtask - The identifier of the subtask to be deleted.
 */

  deleteSubtask(subtask: string){
    let mySubtask = this.findSubtask(subtask);
    this.subtasks.splice(mySubtask, 1);
    this.closeSubtaskEditor(subtask);
  }

  /**
   * Submits the edited value of a subtask and closes the subtask editor.
   * Finds the index of the subtask in the subtasks list, updates the value
   * at that index with the new value from the input field, and then calls
   * closeSubtaskEditor to hide the input container and show the display
   * container.
   * @param subtask - The identifier of the subtask to be submitted.
   */

  submitEditSubtask(subtask: string){
    let mySubtaskIndex = this.findSubtask(subtask);
    let currentInput = document.getElementById(subtask + "-value") as HTMLInputElement;
    let newSubtaskValue = currentInput.value;
    this.subtasks[mySubtaskIndex] = newSubtaskValue;
    this.closeSubtaskEditor(subtask);
  }

/**
 * Finds the index of a given subtask in the subtasks array.
 * 
 * @param subtask - The subtask string to be located.
 * @returns The index of the subtask within the subtasks array,
 *          or -1 if the subtask is not found.
 */

  /**
   * Finds the index of the subtask in the subtasks array.
   * @param subtask The subtask to be found.
   * @returns The index of the subtask in the subtasks array.
   */

  findSubtask(subtask: string){
    const currentSubtask = subtask;
    let subtaskIndex = this.subtasks.indexOf(currentSubtask);
    return subtaskIndex;
  }
}
