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
  @Output() contactCreated = new EventEmitter<any>(); 
  
  contact = {
    name: "",
    mail: "",
    phone: ""
  }
  isHidden = true;

  constructor(public modalWindowService: ModalWindowService){}
  openInfo(){
    this.modalWindowService.openInfo('add-contact', 'absolute-background-add');
  }
  closeInfo(){
    this.modalWindowService.closeInfo('add-contact', 'absolute-background-add');
  }

  cleanInputs(){
    this.contact = { name: '', mail: '', phone: '' };
  }

  createContact(){
    const [name, surname] = this.contact.name.split(' '); 

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
