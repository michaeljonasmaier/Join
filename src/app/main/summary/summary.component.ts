import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user';
import { FirebaseTasksService } from '../../services/firebase-tasks.service';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  currentUser: UserInterface = {name: "", "email": ""} ;
  boardData = inject(FirebaseTasksService);
  constructor(private router: Router, private authService: AuthService) {
    if(this.authService.currentUser){
      this.currentUser = this.authService.currentUser;
    }
    this.getUpcomingDate();
  }

  onCardClick(metric: string): void {
    console.log('Clicked on:', metric);
    this.router.navigate(['main/board']); 
  }

  getNumberOfUrgentTasks(): number{
    let urgentTasks = 0;
    this.boardData.tasks.forEach(task => {
      if(task.prio == 'Urgent'){
        urgentTasks++
      }
    });

    return urgentTasks;
  }

  getUpcomingDate(): string{ 
    let dueDates: string [] = [];
    this.boardData.tasks.forEach(task => {
      dueDates.push(task.date)
    });
    let futureDates = dueDates.map(date => new Date(date));
    let nextDate = futureDates.reduce((a, b) => (a < b ? a : b));
    return this.styleDate(nextDate);
  }

  styleDate(date: Date): string{
    let month = date.toLocaleString('en-us', { month: 'long' });
    let day = date.getDate();
    let year = date.getFullYear();
    return month + " " + day + ", " + year;
  }

}
