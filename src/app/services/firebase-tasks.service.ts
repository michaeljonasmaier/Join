import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, query } from '@angular/fire/firestore';
import { Task } from '../interfaces/task';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTasksService {
  tasks: Task[] = [];
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
    })
  }

  getTasksRef() {
    return collection(this.firestore, 'tasks');
  }

  setTaskObject(obj: any, objId: string): Task {
    return {
      title: obj.title || " ",
      description: obj.description || " ",
      date: obj.data || " ",
      status: obj.status || "toDo",
      category: obj.category || "technical task",
      prio: obj.prio || "medium",
      subtasks: obj.subtasks || [],
      assigned: obj.assigned || this.exampleAssigned,
      id: objId,
    }
  }

  ngOnDestroy() {
    if (this.unsubTasks) {
      this.unsubTasks();
    }
  }
}
