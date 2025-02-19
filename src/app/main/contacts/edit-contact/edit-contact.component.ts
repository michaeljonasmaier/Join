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
  

  ngOnInit() {
    if (this.currentContact) {
      this.updateContactModel(this.currentContact);
    }
  }

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

    ngOnChanges(changes: SimpleChanges) {
      if (changes['currentContact']?.currentValue) {
        this.updateContactModel(changes['currentContact'].currentValue);
      } else {
        console.log('currentContact is null or undefined в ngOnChanges');
      }
    }


  openInfo(){
    this.modalWindowService.openInfo('edit-contact', 'edit-absolute-background');
    this.updateContact();
  }
  closeInfo(){
    this.modalWindowService.closeInfo('edit-contact', 'edit-absolute-background');
  }

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

  editContact(){
    this.updateContact()
    this.contactsService.editContact(this.contact);
    this.contactsService.updateContact(this.contact)
    this.closeInfo();
  }

  deleteContact(){
    this.deleteContactEvent.emit();
    this.closeInfo()
  }
}
