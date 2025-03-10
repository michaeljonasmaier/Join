import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navigationService  = inject(NavigationService);
  isLoggedIn = false;
  

  constructor(private navigation: NavigationService, private authService: AuthService){
    if(this.authService.isLoggedIn){
      this.isLoggedIn = true;
    }
  }

  /**
   * sets navigation item active
   * @param {number} index - index of the navigation item
   * @param {string} route - route of the navigation item
   */
  setActive(index: number, route: string) {
    this.navigation.setActive(index, route);
  }
}
