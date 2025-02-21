import { inject, Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, onSnapshot, query, updateDoc } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTasksService {
  tasks: Task[] = [];
  toDo: Task[] = [];
  inProgress: Task[] = [];
  awaitFeedback: Task[] = [];
  done: Task[] = [];
  exampleAssigned: Contact[] = [{
    name: "Michael",
    surname: "Maier",
    mail: "maier@mail.com",
    phone: "89879923648",
    initials: "MM",
    id: "08734jkhf78",
    color: "#5B8E7D",
  }, {
    name: "Michael",
    surname: "Maier",
    mail: "maier@mail.com",
    phone: "89879923648",
    initials: "MM",
    id: "08734jkhf78",
    color: "#D72638",
  }]
  firestore: Firestore = inject(Firestore);
  unsubTasks;

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

  sortTasks(){
    this.toDo = [];
    this.inProgress = [];
    this.awaitFeedback = [];
    this.done = [];
    this.tasks.forEach(task => {
      if(task.status === 'toDo'){
        this.toDo.push(task);
      } else if(task.status === 'inProgress'){
        this.inProgress.push(task);
      } else if(task.status === 'awaitFeedback'){
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
      assigned: obj.assigned || this.exampleAssigned,
      id: objId,
    }
  }

  async updateTask(editedTask: Task, newStatus: string){
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
   async addTask(newTask: Task){
      await addDoc(this.getTasksRef(), newTask);
    }

  ngOnDestroy() {
    if (this.unsubTasks) {
      this.unsubTasks();
    }
  }
}
