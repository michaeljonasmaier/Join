import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { JoinBtnComponent } from '../shared/join-btn/join-btn.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, JoinBtnComponent],
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