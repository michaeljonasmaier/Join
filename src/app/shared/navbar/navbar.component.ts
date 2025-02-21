import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  activeIndex: number | null = 3;

  constructor(private router: Router){

  }

  setActive(index: number, route: string) {
    this.activeIndex = index;
    this.router.navigate(['main/' + route]);
  }
}
