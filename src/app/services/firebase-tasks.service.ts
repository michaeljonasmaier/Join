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

  getTasksRef() {
    return collection(this.firestore, 'tasks');
  }

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

  async addTask(newTask: Task) {
    if(this.specificStatus){
      newTask.status = this.specificStatus;
      this.specificStatus = undefined;
    }
    await addDoc(this.getTasksRef(), newTask);
  }

  async deleteTask(taskID: string){
    await deleteDoc(doc(this.firestore, 'tasks', taskID))
  }

  updateCurrentTask(task: Task){
    this.taskSubject.next(task);
  }

  ngOnDestroy() {
    if (this.unsubTasks) {
      this.unsubTasks();
    }
  }
}
