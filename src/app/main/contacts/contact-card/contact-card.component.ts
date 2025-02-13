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


 
}