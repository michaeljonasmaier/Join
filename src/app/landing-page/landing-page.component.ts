import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor() {}

  onLogin(): void {
    console.log('Login clicked');
  }

  onGuestLogin(): void {
    console.log('Guest Login clicked');
  }
}