import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  user = { name: '', email: '', password: '', confirmPassword: '', acceptedPolicy: false };
  constructor(private router: Router, private authService: AuthService) {

  }

  navigateBack(){
    this.router.navigate(['']);
  }

  onSubmit(ngForm: any) {
    console.log(this.user);
    this.authService.signUp(this.user.email, this.user.password);
    this.authService.showUser();
    this.navigateBack();
  }

}
