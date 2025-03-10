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

  /**
   * subscribe contacts list from firebase
   * @returns the contact list from the database
   */
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

  /**
   * sets a random color to the contact
   */
  setRandomColor(){
    this.contacts.forEach((contact, index) => {
      contact.color = this.bgColors[index % this.bgColors.length]
    });
  }

  /**
   * sets a new contact active
   * @param {any} newContact - the contact that gets active
   */
  updateContact(newContact: any) {
    this.contactSource.next(newContact); 
  }

  /**
   * get the contacts collection reference
   * @returns the collection of the database
   */
  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  /**
   * add a new contact to database
   * @param {Contact} newContact - the new contact that gets added
   */
  async addContact(newContact: Contact){
    await addDoc(this.getContactsRef(), newContact);
  }

  /**
   * edit a contact and save the new version in the database
   * @param {Contact} editedContact - the edited contact that gets updated
   */
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

  /**
   * delete a specific contact in the database
   * @param {string} contactID - contact ID
   */
  async deleteContact(contactID: string){
    await deleteDoc(doc(this.firestore, 'contacts', contactID))
  }

  /**
   * turns an obj into a contact object
   * @param {any} obj - the Object itself
   * @param {string} objId - its ID
   * @returns {Contact} - the new Contact Object
   */
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

  /**
   * set the selected Contact 
   * @param {Contact} contact - the selected Contact
   */
  selectContact(contact: Contact){
    this.contactSource.next(contact);
  }

  /**
   * get the initials of the contact object
   * @param {any} obj - the object
   * @returns {string} the initials
   */
  getContactInitials(obj: any): string{
    let nameInitial = obj.name.slice(0, 1);
    let surnameInitial = obj.surname.slice(0, 1);
    return nameInitial + surnameInitial;
  }

  /**
   * unsubscribe on destroy
   */
  ngOnDestroy(){
    if(this.unsubContacts){
      this.unsubContacts();
    }
  }
}
