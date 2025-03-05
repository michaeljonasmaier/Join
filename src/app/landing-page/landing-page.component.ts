import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { JoinBtnComponent } from '../shared/join-btn/join-btn.component';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  user = { email: '', password: '' };
  logInFailed: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
    this.authService.signIn(this.user.email, this.user.password).then((success) => {
      if (success) {
        console.log("Weiterleiten zum Dashboard...");
        this.router.navigate(['main/']);
      } else {
        this.logInFailed = true
      }
    });
  
  }

  onGuestLogin(): void {
    console.log('Guest Login clicked');
  }

  navigateToSignUp(){
    this.router.navigate(['signUp']);
  }
}