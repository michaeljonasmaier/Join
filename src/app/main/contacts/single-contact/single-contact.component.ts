import { Component } from '@angular/core';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [JoinBtnComponent, FormsModule],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
  contact = {
    name: "",
    email: "",
    phone: ""
  }
  isHidden = true;

  closeInfo(){
    this.isHidden = true;
    this.moveWindow();
  }
  openInfo(){
    this.isHidden = false;
    this.moveWindow();
  }

  moveWindow(){
    console.log('moved');
    let window = document.getElementById('add-contact');
    if (!window) return;
    window.style.transform = this.isHidden ? 'translateX(150%)' : 'translateX(0)';
  }
  cleanInputs(){
    this.contact = { name: '', email: '', phone: '' };
  }

  createContact(){
    const [name, surname] = this.contact.name.split(' ');

    const newContact = {
      name: name || '',  
      surname: surname || '',
      email: this.contact.email,
      phone: this.contact.phone
    };

    console.log('Создан новый контакт:', newContact);
    this.cleanInputs();
  }
}
