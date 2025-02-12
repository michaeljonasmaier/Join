import { Component } from '@angular/core';
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
  bgColors = ["#D72638", "#F46036", "#F3A712", "#5B8E7D", "#3A86FF", "#8338EC", "#FF006E", "#2EC4B6", "#EF476F", "#06D6A0"];
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

  getInitials(name: string, surname: string) {
    let nameInitial = name.slice(0, 1);
    let surnameInitial = surname.slice(0, 1);
    return nameInitial + surnameInitial;
  }

  getFirstLetter(name: string){
    return name.slice(0, 1);
  }

  hasLetterChanged(currentLetter: string): boolean {
    let hasChanged = currentLetter !== this.previousLetter;
    this.previousLetter = currentLetter; // Update the previous letter
    return hasChanged;
  }

  addNewContact(contact: any){
    this.contactList.push(contact);  // Add new contact in Array
  }

}
