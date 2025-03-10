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

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Creates a new instance of the AddTaskComponent.
   *
   * @param fb The form builder used to create the form.
   * @param taskService The task service used to add the task to the database.
   * @param contactService The contact service used to get the list of users.
   * @param modalWindowService The modal window service used to show the modal window.
   */
/******  3e6dc7d6-1865-4dde-aab4-d2d3be528f44  *******/
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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Retrieves the list of contacts from the contact service.
 * @returns {Contact[]} - An array of Contact objects.
 */

/******  c01a8592-ad3e-4073-8cdf-d467e2bd27ad  *******/
  getUserList(){
    return this.contactService.contacts;
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Sets the priority of the task to the given value.
   * 
   * Also updates the form value and calls the changePriority function.
   * @param priority The new priority of the task.
   */
/******  d37fb7c7-95ba-42fe-bc27-f183ac7476a3  *******/
  setPriority(priority: 'Urgent' | 'Medium' | 'Low') {
    this.priority = priority;
    this.taskForm.patchValue({ priority });
    this.changePriority(priority);
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Resets the form and clears all the data in the component.
   * Used when the user clicks the 'Clear' button.
   */
/******  08b2f1cf-96ea-4ee1-af4f-5c7fa0909495  *******/
  onClear() {
    this.taskForm.reset();
    this.priority = 'Medium';
    this.subtasks = [];
    this.myColors = [];
    this.myInitials = [];
    
  }

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Saves a new subtask from the input field. 
 * If the input value is empty, displays a placeholder and a warning message.
 * Otherwise, adds the subtask to the list and clears the input field.
 */

/******  d9ddf2cf-0f25-448c-b703-c6124b4d857d  *******/
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
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Clears the value of the subtask input field.
 * If the input field is not found, the function exits early.
 */

/******  40457e4d-fb22-4a75-a820-01247c0449aa  *******/
  cleanSubtask(){
    let myInput = document.getElementById('subtasks') as HTMLInputElement;
    if (!myInput) return;
    myInput.value = ""
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Toggles the visibility of the subtask icons.
   * If the event target is not the subtask input field, the icons are hidden.
   * If the event target is the subtask input field, the icons are shown.
   * @param event The event that triggered the toggle.
   */
/******  eed63dcb-579c-44b1-a389-dae225f2c040  *******/
  toggleSubtaskIcons(event: Event) {
    this.subtaskIconShown = true;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Hides the subtask icons if the event target is not the subtask input field.
   * @param event The event that triggered the hiding.
   */
/******  e0e87120-5cf3-41cf-8585-18adb804c3ed  *******/
  closeSubtaskIcons(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.subtask-input')) {
      this.subtaskIconShown = false;
    }
  }


/*************  ✨ Codeium Command ⭐  *************/
/**
 * Toggles the presence of the given initials in the myInitials array.
 * If the initials are not present, they are added. If they are present,
 * they are removed along with their corresponding color from myColors array.
 * 
 * @param initials - The initials to be toggled in the myInitials array.
 */

/******  c8994a6d-35b1-4217-a2cc-763683ee2a91  *******/
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

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Adds the given color to the myColors array.
   * If the color is undefined, the default color "#D72638" is added instead.
   * @param color The color to be added to the myColors array.
   */
/******  935b87bd-5800-4788-97cb-69fd47982748  *******/
  getColor(color: string | undefined){
    if(color === undefined){
      this.myColors.push("#D72638")
    }else{
      this.myColors.push(color)
    }
  }
  

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Submits the task form if it is valid, creates a new task object,
 * sends a notification, adds the task to the task service, and clears the form.
 * The new task includes title, date, status, category, description, priority,
 * subtasks, assigned contacts, and a unique ID.
 */

/******  595db9c7-9f9d-4a29-b3d6-35b1b62033ad  *******/
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
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Resets a single priority to its default state by removing its corresponding
   * CSS class from the DOM element. This is used to reset the priority when
   * the user clicks on a different priority.
   * @param priority The priority to reset.
   */
/******  0362b6c7-bb1c-413f-9aef-c88bc63a5571  *******/
  resetSinglePriority(priority: string){
    document.getElementById(priority)?.classList.remove(priority);
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Toggles the visibility of the plus button and the subtask buttons
   * and focuses the subtask input field.
   */
/******  936304b6-d071-4a64-88f7-87edb7109e2f  *******/
  changeSubtaskIcons(){
    document.getElementById('plus-button')?.classList.add('d-none');
    document.getElementById('subtask-buttons')?.classList.remove('d-none');
    document.getElementById('subtasks')?.focus();
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Sends a notification with the id "notification" to the ModalWindowService.
   * It is called after submitting the task form.
   */
/******  036738ac-8afc-4fd5-a4c1-541ddae09097  *******/
  sendNotification(){
    console.log(document.getElementById("notification"));
    setTimeout(() => this.modalWindowService.sendNotification("notification"), 0);
  }

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Switches the visibility of a subtask's container elements by hiding
 * the subtask display container and showing the input container for editing.
 * @param subtask The identifier of the subtask to be edited.
 */

/******  0c7204d7-ebb1-4a45-b957-461d2d575698  *******/
  editSubtask(subtask: string){
    document.getElementById('subtask-container-' + subtask)?.classList.add('d-none');
    document.getElementById('single-subtask-container-' + subtask)?.classList.remove('d-none');
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Closes the subtask editor for the given subtask by hiding the input container
   * and showing the display container.
   * @param subtask The identifier of the subtask to be closed.
   */
/******  f46ee518-35a0-42b6-abfc-beffb56d5e35  *******/
  closeSubtaskEditor(subtask:string){
    document.getElementById('subtask-container-' + subtask)?.classList.remove('d-none');
    document.getElementById('single-subtask-container-' + subtask)?.classList.add('d-none');
  }

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Deletes a specified subtask by its identifier.
 * Finds the index of the subtask, removes it from the subtasks list,
 * and closes the subtask editor for that subtask.
 * @param subtask - The identifier of the subtask to be deleted.
 */

/******  cba74822-7de5-4b26-8636-54f201fd802b  *******/
  deleteSubtask(subtask: string){
    let mySubtask = this.findSubtask(subtask);
    this.subtasks.splice(mySubtask, 1);
    this.closeSubtaskEditor(subtask);
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Submits the edited value of a subtask and closes the subtask editor.
   * Finds the index of the subtask in the subtasks list, updates the value
   * at that index with the new value from the input field, and then calls
   * closeSubtaskEditor to hide the input container and show the display
   * container.
   * @param subtask - The identifier of the subtask to be submitted.
   */
/******  ec893f9d-2003-463b-a07b-2658b685b548  *******/
  submitEditSubtask(subtask: string){
    let mySubtaskIndex = this.findSubtask(subtask);
    let currentInput = document.getElementById(subtask + "-value") as HTMLInputElement;
    let newSubtaskValue = currentInput.value;
    this.subtasks[mySubtaskIndex] = newSubtaskValue;
    this.closeSubtaskEditor(subtask);
  }


/*************  ✨ Codeium Command ⭐  *************/
/**
 * Finds the index of a given subtask in the subtasks array.
 * 
 * @param subtask - The subtask string to be located.
 * @returns The index of the subtask within the subtasks array,
 *          or -1 if the subtask is not found.
 */

/******  51a36a4e-a631-41fd-99b8-5da55b7c1be8  *******/
  findSubtask(subtask: string){
    const currentSubtask = subtask;
    let subtaskIndex = this.subtasks.indexOf(currentSubtask);
    return subtaskIndex;
  }
}
/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Finds the index of the subtask in the subtasks array.
   * @param subtask - The subtask to be found.
   * @returns The index of the subtask in the subtasks array.
   */
/******  c3e793dc-6feb-4823-9eb1-90f3ce3f39df  *******/