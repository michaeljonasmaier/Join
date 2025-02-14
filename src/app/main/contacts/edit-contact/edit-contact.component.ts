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
    console.log(this.contact)
    if (this.currentContact) {
      console.log("передалось" + this.contact);
      this.updateContactModel(this.currentContact);
    }
  }

  private updateContactModel(contact: Contact) {
    this.contact = {  
      name: contact.name, 
      surname: contact.surname,
      mail: contact.mail,
      phone: contact.phone,
      initials: contact.initials,
      id: contact.id
    };
    console.log("обновилось");
  }

    ngOnChanges(changes: SimpleChanges) {
      if (changes['currentContact']?.currentValue) {
        console.log('Обновился инпут контакта:', changes['currentContact']?.currentValue);
        this.updateContactModel(changes['currentContact'].currentValue);
      } else {
        console.log('currentContact is null or undefined в ngOnChanges');
      }
    }


  // takes info from service (open and close)
  openInfo(){
    this.modalWindowService.openInfo('edit-contact');
  }
  closeInfo(){
    this.modalWindowService.closeInfo('edit-contact');
  }

  editContact(){
    this.contactsService.editContact(this.contact);
    this.closeInfo();
  }

  deleteContact(){
    this.deleteContactEvent.emit();
    this.closeInfo()
  }
}
