import { Component, Input, SimpleChanges, OnInit , Output, EventEmitter } from '@angular/core';
import { GreyBackgroundComponent } from '../../../shared/grey-background/grey-background.component';
import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
import { Contact } from '../../../interfaces/contact';
import { FormsModule } from '@angular/forms';

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
    email: "",
    phone: ""
  }
  
  constructor(public modalWindowService: ModalWindowService){
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
      name: contact.name + " " + contact.surname, 
      email: contact.email,
      phone: contact.phone
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

  editContact(){}

  deleteContact(){
    this.deleteContactEvent.emit();
    this.closeInfo()
  }
}
