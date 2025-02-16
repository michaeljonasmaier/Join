import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from '../contacts.component';
import { Contact } from '../../../interfaces/contact';
import { FirebaseContactsService } from '../../../services/firebase-contacts.service';
import { EditContactComponent } from "../edit-contact/edit-contact.component";
import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, EditContactComponent],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  //@ViewChild(EditContactComponent) editComponent!: EditContactComponent;

  selectedContact: Contact | null = null;

  @Output() close = new EventEmitter<void>();

  constructor(private contactsService: FirebaseContactsService, public modalWindowService: ModalWindowService) {

  }
  
  ngOnInit() {
    this.contactsService.selectedContact$.subscribe(contact => {
      this.selectedContact = contact;
    });
  }

  deleteContact() {
    if(this.selectedContact){
      this.contactsService.deleteContact(this.selectedContact.id);
      this.selectedContact = null;
    }
  }

 /*
  editContact(){
      this.editComponent.openInfo();
  }
*/
  closeCard(): void {
    this.close.emit();
  }

  openInfo(){
    this.modalWindowService.openInfo('actions_mobile');
  }

  closeInfo(){
    this.modalWindowService.closeInfo('actions_mobile');
  }

  bubblingProtection(event: any) {
    event.stopPropagation();
}
}