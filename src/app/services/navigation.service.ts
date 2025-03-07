import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  activeIndex: number | null = 0;
  currentRoute: {index: number, route: string} = {index: 0, route: ""};
  lastRoute:{index: number, route: string} = {index: 0, route: ""};
  constructor(private router: Router) { 

  }

  setActive(index: number, route: string) {
    this.activeIndex = index;
    this.currentRoute = {index: index, route: route}
    this.router.navigate(['main/' + route]);
  }
}
