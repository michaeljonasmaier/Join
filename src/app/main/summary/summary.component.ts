import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  currentUser: UserInterface = {name: "", "email": ""} ;
  constructor(private router: Router, private authService: AuthService) {
    if(this.authService.currentUser){
      this.currentUser = this.authService.currentUser;
    }
    
  }

  onCardClick(metric: string): void {
    console.log('Clicked on:', metric);
    this.router.navigate(['main/board']); 
  }

}
