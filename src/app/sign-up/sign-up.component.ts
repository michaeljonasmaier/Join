import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  user = { name: '', email: '', password: '', confirmPassword: '', acceptedPolicy: false };
  constructor(private router: Router) {

  }

  navigateBack(){
    this.router.navigate(['']);
  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
  }
}
