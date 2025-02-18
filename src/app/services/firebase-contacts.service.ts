import { Injectable, inject, OnDestroy } from '@angular/core';
import { collection, Firestore, limit, onSnapshot, query, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseContactsService {

  contacts: Contact [] = [];
  bgColors = ["#D72638", "#F46036", "#F3A712", "#5B8E7D", "#3A86FF", "#8338EC", "#FF006E", "#2EC4B6", "#EF476F", "#06D6A0"];

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
      this.setRandomColor();
    })
  }

  setRandomColor(){
    this.contacts.forEach((contact, index) => {
      contact.color = this.bgColors[index % this.bgColors.length]
    });
  }

  updateContact(newContact: any) {
    this.contactSource.next(newContact); 
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
