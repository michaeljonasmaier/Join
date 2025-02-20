import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {
  isHidden = true;
  isButtonHidden = true;

  getScreenWidth(){
    let screenWidth = window.innerWidth;
    return screenWidth;
  }

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
    let currentWidth = this.getScreenWidth();
    if(currentWidth > 600){
    window.style.transform = this.isHidden ? 'translateX(150%)' : 'translateX(0)';
    }else{
      window.style.transform = this.isHidden ? 'translateY(150%)' : 'translateY(0)';
    }
  }

  changeBg(bg: string){
    let background = document.getElementById(bg);
    if (!background) return;
    background.classList.toggle('d-none');
  }

  openButton(id: string, bg: string){
    this.isButtonHidden = false;
    this.moveButton(id);
    this.changeBg(bg)
  }

  closeButton(id: string, bg: string){
    this.isButtonHidden = true;
    this.moveButton(id);
    this.changeBg(bg)
  }

  moveButton(id: string){
    let window = document.getElementById(id);
    if (!window) return;
    window.style.transform = this.isButtonHidden ? 'translateX(150%)' : 'translateX(0)';
  }
}
