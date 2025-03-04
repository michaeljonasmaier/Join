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
  constructor(private router: Router) {

  }

  navigateBack(){
    this.router.navigate(['main/']);
  }

  onSubmit(ngForm: NgForm) {
    if(ngForm.valid){

    }
  }
}
