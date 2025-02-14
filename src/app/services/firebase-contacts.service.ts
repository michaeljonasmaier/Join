import { Injectable, inject, OnDestroy } from '@angular/core';
import { collection, Firestore, limit, onSnapshot, query, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
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
          console.log(element.data())
      });
      console.log(this.contacts);
    })
  }

  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  async addContact(newContact: Contact){
    await addDoc(this.getContactsRef(), newContact);
  }

  async editContact(editedContact: Contact){
    await updateDoc(doc(this.firestore, 'contacts', editedContact.id), {
      name: editedContact.name,
      surname: editedContact.surname,
      phone: editedContact.phone,
      mail: editedContact.mail,
      initials: editedContact.initials,
      id: editedContact.id,
    })
  }

  async deleteContact(contactID: string){
    await deleteDoc(doc(this.firestore, 'contacts', contactID))
  }

  setContactObject(obj: any, objId: string): Contact{
    return {
      name: obj.name || " ",
      surname: obj.surname || " ",
      mail: obj.mail || " ",
      phone: obj.phone || " ",
      initials: this.getContactInitials(obj),
      id: objId
    }
  }

  selectContact(contact: Contact){
    this.contactSource.next(contact);
  }

  getContactInitials(obj: any){
    let nameInitial = obj.name.slice(0, 1);
    let surnameInitial = obj.surname.slice(0, 1);
    return nameInitial + surnameInitial;
  }

  ngOnDestroy(){
    if(this.unsubContacts){
      this.unsubContacts();
    }
  }
}
