import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeIndex: number | null = null;
  navItems = ['Home', 'About', 'Contact']; // Beispiel-Daten

  setActive(index: number) {
    this.activeIndex = index;
  }
}
