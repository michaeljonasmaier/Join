import { Injectable, inject, OnDestroy } from '@angular/core';
import { collection, Firestore, limit, onSnapshot, query, doc } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseContactsService {

  contacts: Contact [] = [];

  firestore: Firestore = inject(Firestore);
  unsubContacts;
  contactSource = new BehaviorSubject<Contact | null>(null);
  selectedContact$ = this.contactSource.asObservable();

  constructor() { 
    this.unsubContacts = this.subContactsList();
  }

  subContactsList(){
    let q = query(this.getContactsRef());
    
    return onSnapshot(q, (list) => {
      this.contacts = []
      list.forEach(element => {
          this.contacts.push(this.setContactObject(element.data(), element.id));
      });
    })
  }

  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  setContactObject(obj: any, objId: string): Contact{
    return {
      name: obj.name || "Max",
      surname: obj.surname || "Mustermann",
      email: obj.email || "maxmustermann@mail.com",
      phone: obj.phone || "+49 0000000",
      id: objId
    }
  }

  selectContact(contact: Contact){
    this.contactSource.next(contact);
  }

  ngOnDestroy(){
    if(this.unsubContacts){
      this.unsubContacts();
    }
  }
}
