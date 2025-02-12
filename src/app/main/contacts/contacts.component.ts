import { Component } from '@angular/core';
import { FirebaseContactsService } from '../../services/firebase-contacts.service';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contactList/contact-list.component';
import { SingleContactComponent } from "./single-contact/single-contact.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, SingleContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  
}
