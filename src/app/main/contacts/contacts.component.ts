import { Component } from '@angular/core';
import { FirebaseContactsService } from '../../services/firebase-contacts.service';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contactList/contact-list.component';
import { SingleContactComponent } from "./single-contact/single-contact.component";
import { ContactCardComponent } from "./contact-card/contact-card.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactListComponent, SingleContactComponent, ContactCardComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  screenWidth: number = 1;
  isCardVisible = false;
  resizeListener = () => {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 500){
    }
  };

  /**
   * activates a window resize listener on load
   */

  ngOnInit(): void {
    this.screenWidth = window.innerWidth; // Initiale Breite setzen
    window.addEventListener('resize', this.resizeListener);
  }

  /**
   * destory the window resize listener
   */

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  /**
   * toogle the cardvisible
   * @param {boolean} show - true if card should be visible
   */
  
  toggleCard(show: boolean): void {
    this.isCardVisible = show;
  }
}
