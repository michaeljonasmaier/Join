import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from '../contacts.component';
import { Contact } from '../../../interfaces/contact';
import { FirebaseContactsService } from '../../../services/firebase-contacts.service';
@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {

  selectedContact: Contact | null = null;

  constructor(private contactsService: FirebaseContactsService){

  }

  ngOnInit(){
   this.contactsService.selectedContact$.subscribe(contact => {
    this.selectedContact = contact;
   }); 
  }

  
  contact = {
    name: 'Anton Mayer',
    email: 'anton@gmail.com',
    phone: '+49 1111 111 11 1',
    initials: 'AM'
  };
}
