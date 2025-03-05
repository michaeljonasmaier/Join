import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  constructor(private router: Router) {}

  onCardClick(metric: string): void {
    console.log('Clicked on:', metric);
    this.router.navigate(['/tasks', metric.toLowerCase().replace(/ /g, '-')]); 
  }

}
