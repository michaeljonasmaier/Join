import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  menuOpened = true;
  firstLoad = true;
  active: boolean = true;
  @Output() close = new EventEmitter<void>();
  constructor(private navigation: NavigationService, private authService: AuthService, private router: Router){
  }

  /**
   * closes the menu and navigates to help
   */

  navigateToHelp() {
    this.closeMenu();
    this.navigation.setActive(-1, "help");
  }

  /**
   * closes the menu and navigates to a specific path
   * @param {string} path - the path we want to navigate to
   */

  navigateToX(path: string){
    this.closeMenu();
    this.navigation.setActive(-1, path);
  }

  /**
   * sign out in auth service and navigate to landing page
   */

  signOut(){
    this.authService.signOut();
    this.router.navigate(['']);
    this.closeMenu();
  }

  /**
   * closes the menu with little timeout for animation to finish
   */
  
  closeMenu(){
    this.active = false;
    this.menuOpened = false;
    setTimeout(() => {
      this.close.emit();
    }, 300);
  }
}
