import { Component, Output, EventEmitter } from '@angular/core';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';
import { FormsModule } from '@angular/forms';
import { GreyBackgroundComponent } from '../../../shared/grey-background/grey-background.component';
import { ModalWindowService } from '../../../services/modal-window/modal-window.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [JoinBtnComponent, FormsModule, GreyBackgroundComponent, CommonModule],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
  @Output() contactCreated = new EventEmitter<any>(); //send new comment to the list
  
  contact = {
    name: "",
    mail: "",
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

  toggleAddContact(){
    this.isHidden = !this.isHidden;
  }

  cleanInputs(){
    this.contact = { name: '', mail: '', phone: '' };
  }

  createContact(){
    const [name, surname] = this.contact.name.split(' '); //Makes first and second name from one

    const newContact = {
      name: name || '',  
      surname: surname || '',
      mail: this.contact.mail,
      phone: this.contact.phone
    };
    this.contactCreated.emit(newContact);

    console.log('New contact:', newContact);
    this.cleanInputs();
    this.closeInfo();
  }
  
}
