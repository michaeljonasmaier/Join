import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navigationService  = inject(NavigationService);
  

  constructor(private navigation: NavigationService){
  
  }

  setActive(index: number, route: string) {
    this.navigation.setActive(index, route);
  }
}
