import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.scss'
})
export class ContactCardComponent {
  contact = {
    name: 'Anton Mayer',
    email: 'anton@gmail.com',
    phone: '+49 1111 111 11 1',
    initials: 'AM'
  };
}
