import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  isHidden = true;

  closeInfo(id: string, bg: string){
    this.isHidden = true;
    this.moveWindow(id);
    this.changeBg(bg);
  }
  
  openInfo(id: string, bg: string){
    this.isHidden = false;
    this.moveWindow(id);
    this.changeBg(bg);
  }

  moveWindow(id: string){
    let window = document.getElementById(id);
    if (!window) return;
    window.style.transform = this.isHidden ? 'translateX(150%)' : 'translateX(0)';
  }

  changeBg(bg: string){
    let background = document.getElementById(bg);
    if (!background) return;
    background.classList.toggle('d-none');
  }

  //constructor() { }
}
