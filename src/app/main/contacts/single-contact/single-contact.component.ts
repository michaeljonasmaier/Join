import { Component } from '@angular/core';

@Component({
  selector: 'app-single-contact',
  standalone: true,
  imports: [],
  templateUrl: './single-contact.component.html',
  styleUrl: './single-contact.component.scss'
})
export class SingleContactComponent {
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
}
