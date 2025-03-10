import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  user = { name: '', email: '', password: '', confirmPassword: '', acceptedPolicy: false };
  success = false;
  constructor(private router: Router, private authService: AuthService) {

  }

  /**
   * navigates to landing page
   */
  navigateBack() {
    this.router.navigate(['']);
  }

  /**
   * submits the sign up, calls sign up in auth service, calls confirmation and waits to navigate back
   */
  async onSubmit() {
    this.authService.signUp(this.user.name, this.user.email, this.user.password);
    this.success = true;
    await this.delay(2000);
    this.navigateBack();

  }

  /**
   * delay for a specific time
   * @param {number} ms - time to wait
   * @returns {Promise} - a time out to wait for
   */
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
