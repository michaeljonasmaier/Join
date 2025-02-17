import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseContactsService } from '../../../services/firebase-contacts.service';
import { Contact } from '../../../interfaces/contact';
import { CommonModule } from '@angular/common';
import { SingleContactComponent } from '../single-contact/single-contact.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, SingleContactComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  contactList: Contact [] = [];
  previousLetter: string = '';

  constructor(private contactsService: FirebaseContactsService) {

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
    this.previousLetter = currentLetter; // Update the previous letter
    return hasChanged;
  }

  selectContact(contact: Contact){
    this.contactsService.selectContact(contact);
  }

  addNewContact(contact: any){
    this.contactList.push(contact);  // Add new contact in Array
    this.contactsService.addContact(contact);
  }

  @Output() showCard = new EventEmitter<boolean>();

  onShowCard(): void {
    this.showCard.emit(true);
  }

}
