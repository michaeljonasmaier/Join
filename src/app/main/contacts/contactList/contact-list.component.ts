import { Component } from '@angular/core';
import { FirebaseContactsService } from '../../../services/firebase-contacts.service';
import { Contact } from '../../../interfaces/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  constructor(private contactsService: FirebaseContactsService) {


  }

  getList(): Contact[] {
    return this.contactsService.contacts;
  }
}
