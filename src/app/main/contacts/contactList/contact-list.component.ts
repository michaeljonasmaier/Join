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
  contactList: Contact[] = [];
  previousLetter: string = '';
  isActive = false;
  activeIndex: number | null = null;
  @Output() showCard = new EventEmitter<boolean>();
  constructor(private contactsService: FirebaseContactsService) {
  }

  /**
   * Sets item in Contact List active
   * @param {number} index - index of element in contact list
   */

  setActive(index: number) {
    this.activeIndex = index;
  }

  /**
   * gets contact list from ContactsService
   * @returns {Contact[]} - all contacts of contact list
   */

  getList(): Contact[] {
    return this.contactsService.contacts;
  }

  /**
   * Sorts Contact List (a-z)
   * @returns {Contact[]} - returns sorted contact list (a-z)
   */

  getSortedList(): Contact[] {
    this.contactList = this.getList()
    let sortedContactList = this.contactList.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedContactList;
  }

  /**
   * Slices first letter of given name
   * @param {string} name - name we need the first letter of
   * @returns {string} - the first letter of the name
   */

  getFirstLetter(name: string){
    return name.slice(0, 1);
  }

  /**
   * checks if the current letter is different to the previous one 
   * @param {sting} currentLetter - the letter in the alphabet we are currently at
   * @returns {boolean} - true if the letter has changed to the previous letter
   */

  hasLetterChanged(currentLetter: string): boolean {
    let hasChanged = currentLetter !== this.previousLetter;
    this.previousLetter = currentLetter;
    return hasChanged;
  }

  /**
   * sets the selected contact in the contacts Service
   * @param {Contact} contact - the selected contact
   */

  selectContact(contact: Contact) {
    this.contactsService.selectContact(contact);
  }

  /**
   * adds a contact to the contact list and selects it 
   * @param {any} contact - contact that needs to be added
   */

  addNewContact(contact: any) {
    this.contactList.push(contact);
    this.contactsService.addContact(contact);
    contact.initials = this.contactsService.getContactInitials(contact);
    this.contactsService.selectContact(contact);
    this.setNewContactActive(contact);
  }

  /**
   * sets the new added contact active to show it next to the list
   * @param {Contact} newContact - the contact that needs to get active
   */

  setNewContactActive(newContact: Contact) {
    this.getSortedList().forEach((contactItem, index) => {
      if (contactItem.phone === newContact.phone) {
        this.activeIndex = index;
      }
    });
  }

  /**
   * opens the card to show next to the list
   */

  onShowCard(): void {
    this.showCard.emit(true);
  }

  /**
   * Opens the info of a single contact Component
   */

  openAddContact() {
    if (this.singleContactComponent) {
      this.singleContactComponent.openInfo();
    }
  }
}
