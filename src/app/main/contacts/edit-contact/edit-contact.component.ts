import { Component, Input, SimpleChanges, OnInit , Output, EventEmitter } from '@angular/core';
import { GreyBackgroundComponent } from '../../../shared/grey-background/grey-background.component';
import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
import { Contact } from '../../../interfaces/contact';
import { FormsModule } from '@angular/forms';
import { FirebaseContactsService } from '../../../services/firebase-contacts.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [GreyBackgroundComponent, FormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})

export class EditContactComponent implements OnInit{
  @Input() currentContact: Contact | null = null;
  @Output() deleteContactEvent = new EventEmitter<void>();
  contact = {
    name: "",
    surname: "",
    mail: "",
    phone: "",
    initials: "",
    id:""
  }
  constructor(public modalWindowService: ModalWindowService, private contactsService: FirebaseContactsService){
  }
  
/**
 * checks for the selected contact
 */

  ngOnInit() {
    if (this.currentContact) {
      this.updateContactModel(this.currentContact);
    }
  }

  /**
   * sets all values of contact 
   * @param contact - current contact
   */

  private updateContactModel(contact: Contact) {
    this.contact = {  
      name: `${contact.name} ${contact.surname}`.trim(),
      surname: "",
      mail: contact.mail,
      phone: contact.phone,
      initials: contact.initials,
      id: contact.id
    };
  }

  /**
   * checks for the contact's changes
   * @param changes - current changes
   */

    ngOnChanges(changes: SimpleChanges) {
      if (changes['currentContact']?.currentValue) {
        this.updateContactModel(changes['currentContact'].currentValue);
      }
    }

/**
 * opens Edit-contact-window
 */

  openInfo(){
    this.modalWindowService.openInfo('edit-contact', 'edit-absolute-background');
    this.updateContact();
  }

  /**
   * closes Edit-contact-window
   */

  closeInfo(){
    this.modalWindowService.closeInfo('edit-contact', 'edit-absolute-background');
  }

  /**
   * sets new values of current contact
   */

  updateContact(){
    const [name, surname] = this.contact.name.split(' '); 
    this.contact = {
      name: name || '',  
      surname: surname || '',
      mail: this.contact.mail,
      phone: this.contact.phone,
      initials: this.contact.initials,
      id: this.contact.id
    };
  }

/**
 * update contact's parametrs and gives it to contactService, than closes Edit-contact-window
 */

  editContact(){
    this.updateContact()
    this.contactsService.editContact(this.contact);
    this.contactsService.updateContact(this.contact)
    this.closeInfo();
  }

/**
 * delete contact from contact's storage and closes Edit-contact-window
 */

  deleteContact(){
    this.deleteContactEvent.emit();
    this.closeInfo()
  }
}
