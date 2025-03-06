import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser: UserInterface = { name: "", "email": "" };
  currentUserInitials: string = "";
  menuOpened = false;
  firstLoad = true;

  constructor(private navigation: NavigationService, private authService: AuthService, private router: Router) {
    if (this.authService.currentUser) {
      this.currentUser = this.authService.currentUser;
      this.currentUserInitials = this.getInitials(this.currentUser.name);
    }
  }

  navigateToHelp() {
    this.toggleMenu();
    this.navigation.setActive(-1, "help");
  }

  navigateToX(path: string){
    this.toggleMenu();
    this.navigation.setActive(-1, path);
  }

  getInitials(name: string) {
    let splitName = name.split(" ");
    let nameInitial = splitName[0].slice(0, 1);
    let surnameInitial = splitName[1].slice(0, 1);
    return nameInitial + surnameInitial;
  }

  signOut(){
    this.authService.signOut();
    this.authService.isLoggedIn = false;
    this.router.navigate(['']);
    this.toggleMenu();
  }

  toggleMenu(){
    this.menuOpened = !this.menuOpened;
    this.firstLoad = false;
  }
}
