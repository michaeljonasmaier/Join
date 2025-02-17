import { Component, ViewChild, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
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

  selectedContact: Contact | null = null;

  @Output() close = new EventEmitter<void>();

  constructor(private contactsService: FirebaseContactsService, public modalWindowService: ModalWindowService) {

  }

  ngOnInit() {
    this.contactsService.selectedContact$.subscribe(contact => {
      this.selectedContact = contact;
    });
    
    console.log(screen.width)
  }

  deleteContact() {
    if (this.selectedContact) {
      this.contactsService.deleteContact(this.selectedContact.id);
      this.selectedContact = null;
    }
  }

  closeCard(): void {
    this.close.emit();
  }

  openButton(){
    this.modalWindowService.openButton('actions_mobile', 'invise-bg');
  }

  closeButton(){
    this.modalWindowService.closeButton('actions_mobile', 'invise-bg');
  }

  bubblingProtection(event: any) {
    event.stopPropagation();
  }

}