import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  currentUser: UserInterface = { name: "", "email": "" };
  currentUserInitials: string = "";
  menuOpened = false;
  firstLoad = true;
  isLoggedIn = false;

  constructor(private navigation: NavigationService, private authService: AuthService, private router: Router) {
    if (this.authService.currentUser) {
      this.currentUser = this.authService.currentUser;
      if(this.authService.isLoggedIn){
        this.isLoggedIn = true;
        this.currentUserInitials = this.getInitials(this.currentUser.name);
      }
    }
  }

  /**
   * navigates to help component
   */

  navigateToHelp() {
    this.navigation.lastRoute = this.navigation.currentRoute;
    this.navigation.setActive(-1, "help");
  }

  /**
   * gets the initials of the current user
   * @param {string} name - name of current user
   * @returns {string} - the initials
   */

  getInitials(name: string): string {
    let splitName = name.split(" ");
    let nameInitial = splitName[0].slice(0, 1);
    let surnameInitial = splitName[1].slice(0, 1);
    return nameInitial + surnameInitial;
  }

  /**
   * sets menuOpened status to true or false
   */

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
    this.firstLoad = false;
  }
}