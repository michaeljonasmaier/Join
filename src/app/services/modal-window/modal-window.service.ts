import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  isHidden = true;

  closeInfo(id: string){
    this.isHidden = true;
    this.moveWindow(id);
    this.changeBg();
  }
  
  openInfo(id: string){
    this.isHidden = false;
    this.moveWindow(id);
    this.changeBg();
  }

  moveWindow(id: string){
    let window = document.getElementById(id);
    if (!window) return;
    window.style.transform = this.isHidden ? 'translateX(150%)' : 'translateX(0)';
  }

  changeBg(){
    let background = document.getElementById('absolute-background');
    if (!background) return;
    background.classList.toggle('d-none');
  }

  //constructor() { }
}
