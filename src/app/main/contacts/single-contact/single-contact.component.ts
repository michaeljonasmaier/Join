import { Component, Output, EventEmitter } from '@angular/core';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';
import { FormsModule } from '@angular/forms';
import { GreyBackgroundComponent } from '../../../shared/grey-background/grey-background.component';
import { ModalWindowService } from '../../../services/modal-window/modal-window.service';

@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [JoinBtnComponent, FormsModule, GreyBackgroundComponent],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
  @Output() contactCreated = new EventEmitter<any>(); //send new comment to the list
  
  contact = {
    name: "",
    email: "",
    phone: ""
  }
  isHidden = true;
  constructor(public modalWindowService: ModalWindowService){}
  // takes info from service (open and close)
  openInfo(){
    this.modalWindowService.openInfo('add-contact');
  }
  closeInfo(){
    this.modalWindowService.closeInfo('add-contact');
  }

  cleanInputs(){
    this.contact = { name: '', email: '', phone: '' };
  }

  createContact(){
    const [name, surname] = this.contact.name.split(' '); //Makes first and second name from one

    const newContact = {
      name: name || '',  
      surname: surname || '',
      email: this.contact.email,
      phone: this.contact.phone
    };
    this.contactCreated.emit(newContact);

    console.log('New contact:', newContact);
    this.cleanInputs();
    this.closeInfo();
  }
  
}
