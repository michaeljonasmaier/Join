import { Component } from '@angular/core';
import { FirebaseContactsService } from '../../services/firebase-contacts.service';
import { Contact } from '../..//interfaces/contact';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  constructor(private contactsService: FirebaseContactsService){

      
  }

  getList(): Contact[]{
    return this.contactsService.contacts;
  }
}
