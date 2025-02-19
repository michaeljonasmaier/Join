import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FirebaseContactsService } from '../../../services/firebase-contacts.service';
import { Contact } from '../../../interfaces/contact';
import { CommonModule } from '@angular/common';
import { SingleContactComponent } from '../single-contact/single-contact.component';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, SingleContactComponent, JoinBtnComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  @ViewChild(SingleContactComponent) singleContactComponent!: SingleContactComponent; 

  contactList: Contact [] = [];
  previousLetter: string = '';
  isActive = false;
  activeIndex: number | null = null;

  constructor(private contactsService: FirebaseContactsService) {

  }

  setActive(index: number) {
    this.activeIndex = index;
  }


  getList(): Contact[] {
    return this.contactsService.contacts;
  }

  getSortedList(): Contact[]{
    this.contactList = this.getList()
    let sortedContactList = this.contactList.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedContactList;
  }

  getFirstLetter(name: string){
    return name.slice(0, 1);
  }

  hasLetterChanged(currentLetter: string): boolean {
    let hasChanged = currentLetter !== this.previousLetter;
    this.previousLetter = currentLetter; 
    return hasChanged;
  }

  selectContact(contact: Contact){
    this.contactsService.selectContact(contact);
  }

  addNewContact(contact: any){
    this.contactList.push(contact);
    this.contactsService.addContact(contact);
    contact.initials = this.contactsService.getContactInitials(contact);
    this.contactsService.selectContact(contact);
    this.setNewContactActive(contact);
  }

  setNewContactActive(newContact: Contact){
    this.getSortedList().forEach((contactItem, index) => {
      if(contactItem.phone === newContact.phone){
        this.activeIndex = index;
      }
    });
  }

  @Output() showCard = new EventEmitter<boolean>();

  onShowCard(): void {
    this.showCard.emit(true);
  }

  openAddContact(){
    if (this.singleContactComponent) {
      this.singleContactComponent.openInfo();
    }
  }

}
