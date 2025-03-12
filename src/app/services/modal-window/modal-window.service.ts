import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalWindowService {
  isHidden = true;
  isButtonHidden = true;

  /**
   * gets the user's screen size
   * returns it 
   */

  getScreenWidth(){
    let screenWidth = window.innerWidth;
    return screenWidth;
  }

  /**
   * changed hidden parameter
   * closes modal-window and it's background
   * @param id - id of modal-window
   * @param bg - id of background
   */

  closeInfo(id: string, bg: string){
    this.isHidden = true;  
    this.moveWindow(id);
    this.changeBg(bg);
  }

  /**
   * changed hidden parameter
   * opens modal-window and it's background
   * @param id - id of modal-window
   * @param bg - id of background
   */

  openInfo(id: string, bg: string){
    this.isHidden = false;
    this.moveWindow(id);
    this.changeBg(bg);
  }

  /**
   * moves modal-window depending on the hidden parameter and screen width
   * @param id - id of modal-window
   * @returns - nothing, if id is null
   */

  moveWindow(id: string){
    let window = document.getElementById(id);
    if (!window) return;
    let currentWidth = this.getScreenWidth();
    if(currentWidth > 600){
    window.style.transform = this.isHidden ? 'translateX(800%)' : 'translateX(0)';
    }else{
      window.style.transform = this.isHidden ? 'translateY(800%)' : 'translateY(0)';
    }
  }

  /**
   * changes backround's display
   * @param bg id of background
   * @returns - nothing, if bg is null
   */

  changeBg(bg: string){
    let background = document.getElementById(bg);
    if (!background) return;
    background.classList.toggle('d-none');
  }

  /**
   * changed button-hidden parameter
   * opens modal-button and it's background
   * @param id id of modal-button
   * @param bg id of background
   */

  openButton(id: string, bg: string){
    this.isButtonHidden = false;
    this.moveButton(id);
    this.changeBg(bg)
  }

  /**
   * changed button-hidden parameter
   * closes modal-button and it's background
   * @param id id of modal-button
   * @param bg id of background
   */

  closeButton(id: string, bg: string){
    this.isButtonHidden = true;
    this.moveButton(id);
    this.changeBg(bg)
  }

  /**
   * moves modal-button depending on the hidden parameter
   * @param id id of modal-button
   * @returns - nothing, if id is null
   */

  moveButton(id: string){
    let window = document.getElementById(id);
    if (!window) return;
    window.style.transform = this.isButtonHidden ? 'translateX(150%)' : 'translateX(0)';
  }

  /**
   * moves notificationö
   * @param id id of notification
   * @returns - nothing, if id is null
   */

  sendNotification(id: string){
    let notification = document.getElementById(id);
    if (notification == null) return;
    notification.style.transform = 'translateY(0)';
    setTimeout(() => {
      if (!notification) return;
      notification.style.transform = 'translateY(10000%)';
    }, 1500);
  }
}
