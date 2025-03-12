import { inject, Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot, query, updateDoc } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import { Contact } from '../interfaces/contact';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FirebaseTasksService {
  tasks: Task[] = [];
  toDo: Task[] = [];
  inProgress: Task[] = [];
  awaitFeedback: Task[] = [];
  done: Task[] = [];
  specificStatus: 'toDo' | 'inProgress' | 'awaitFeedback' | undefined;
  firestore: Firestore = inject(Firestore);
  unsubTasks;

  private taskSubject = new BehaviorSubject<Task | null>(null);
  currentTask$ = this.taskSubject.asObservable(); 
  constructor() {
    this.unsubTasks = this.subTasksList();
  }

  /**
   * subscribe the task list from Firebase
   * @returns the task list
   */

  subTasksList() {
    let q = query(this.getTasksRef());
    return onSnapshot(q, (list) => {
      this.tasks = []
      list.forEach(element => {
        this.tasks.push(this.setTaskObject(element.data(), element.id));
      });
      this.sortTasks();
    })
  }

  /**
   * sort the tasks into 4 status arrays
   */

  sortTasks() {
    this.toDo = [];
    this.inProgress = [];
    this.awaitFeedback = [];
    this.done = [];
    this.tasks.forEach(task => {
      if (task.status === 'toDo') {
        this.toDo.push(task);
      } else if (task.status === 'inProgress') {
        this.inProgress.push(task);
      } else if (task.status === 'awaitFeedback') {
        this.awaitFeedback.push(task);
      } else {
        this.done.push(task);
      }
    });
  }

  /**
   * get the task collection reference
   * @returns task collection from Firebase
   */

  getTasksRef() {
    return collection(this.firestore, 'tasks');
  }

  /**
   * Turning an object into a task object
   * @param {any} obj - the object itself
   * @param {string} objId - its ID
   * @returns {Task} - the new Task Object
   */

  setTaskObject(obj: any, objId: string): Task {
    return {
      title: obj.title || " ",
      description: obj.description || " ",
      date: obj.date || " ",
      status: obj.status || "toDo",
      category: obj.category || "technical task",
      prio: obj.prio || "medium",
      subtasks: obj.subtasks || [],
      assigned: obj.assigned || [],
      id: objId,
    }
  }

  /**
   * update a task in Firebase
   * @param {Task} editedTask - the task the needs to be updated
   * @param {string} newStatus - its eventually changed status
   */

  async updateTask(editedTask: Task, newStatus: string) {
    await updateDoc(doc(this.firestore, 'tasks', editedTask.id), {
      title: editedTask.title,
      date: editedTask.date,
      status: newStatus,
      category: editedTask.category,
      description: editedTask.description,
      prio: editedTask.prio,
      subtasks: editedTask.subtasks,
      assigned: editedTask.assigned,
      id: editedTask.id,
    })
  }

  /**
   * add a task to the database
   * @param {Task} newTask - new task to be added
   */

  async addTask(newTask: Task) {
    if(this.specificStatus){
      newTask.status = this.specificStatus;
      this.specificStatus = undefined;
    }
    await addDoc(this.getTasksRef(), newTask);
  }

  /**
   * delete a specific task 
   * @param taskID - the task ID
   */

  async deleteTask(taskID: string){
    await deleteDoc(doc(this.firestore, 'tasks', taskID))
  }

  /**
   * set current Task
   * @param {Task} task - the task that is active now
   */

  updateCurrentTask(task: Task){
    this.taskSubject.next(task);
  }

  /**
   * unsubscribe on destroy
   */
  
  ngOnDestroy() {
    if (this.unsubTasks) {
      this.unsubTasks();
    }
  }
}
