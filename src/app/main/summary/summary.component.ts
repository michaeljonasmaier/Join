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

  /**
   * navigates to board  
   */

  onCardClick(): void {
    this.router.navigate(['main/board']); 
  }

  /**
   * counts urgent task in board
   * @returns {number} - number of urgent tasks in board
   */

  getNumberOfUrgentTasks(): number{
    let urgentTasks = 0;
    this.boardData.tasks.forEach(task => {
      if(task.prio == 'Urgent'){
        urgentTasks++
      }
    });
    return urgentTasks;
  }

  /**
   * looks for next upcoming due date in all tasks and return it
   * @returns {string} - the next upcoming date
   */

  getUpcomingDate(): string | null{ 
    let dueDates: string [] = [];
    this.boardData.tasks.forEach(task => {
      dueDates.push(task.date)
    });

    let futureDates = dueDates.map(date => new Date(date));
    if (futureDates.length === 0) {
      return null;
    } 

    let nextDate = futureDates.reduce((a, b) => (a < b ? a : b));
    return this.styleDate(nextDate);
  }

  /**
   * sytles date to month, day, year 
   * @param {Date} date - date that gets styled
   * @returns {string} - the styled date in string format
   */

  styleDate(date: Date): string{
    let month = date.toLocaleString('en-us', { month: 'long' });
    let day = date.getDate();
    let year = date.getFullYear();
    return month + " " + day + ", " + year;
  }
}
