import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activeIndex: number | null = 3;

  constructor(private router: Router) { 

  }

  setActive(index: number, route: string) {
    this.activeIndex = index;
    this.router.navigate(['main/' + route]);
  }
}
