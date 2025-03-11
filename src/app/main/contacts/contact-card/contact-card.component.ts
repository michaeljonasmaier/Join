import { Component, ViewChild, Output, EventEmitter, ChangeDetectorRef, OnInit, viewChild } from '@angular/core';
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
  @ViewChild(EditContactComponent) editComponent!: EditContactComponent; 
  selectedContact: Contact | null = null;
  @Output() close = new EventEmitter<void>();
  constructor(private contactsService: FirebaseContactsService, public modalWindowService: ModalWindowService) {
  }

  /**
   * subscribes the selected Contact from ContactsService
   */

  ngOnInit() {
    this.contactsService.selectedContact$.subscribe(contact => {
      this.selectedContact = contact;
    });
  }

  /**
   * calls the delete contact function in the ContactsService
   */

  deleteContact() {
    if (this.selectedContact) {
      this.contactsService.deleteContact(this.selectedContact.id);
      this.selectedContact = null;
    }
  }

  /**
   * Closes the Window
   */

  closeCard(): void {
    this.close.emit();
  }

  /**
   * Opens the options in mobile version
   */

  openButton(){
    this.modalWindowService.openButton('actions_mobile', 'invise-bg');
  }

  /**
   * closes the options in mobile version
   */

  closeButton(){
    this.modalWindowService.closeButton('actions_mobile', 'invise-bg');
  }

  /**
   * Stops propagation
   * @param event - the event happening (clicking/touching)
   */

  bubblingProtection(event: any) {
    event.stopPropagation();
  }

  /**
   * Opens the info window 
   */

  openEdit(){
    if (this.editComponent) {
      this.editComponent.openInfo();
    }
  }
}