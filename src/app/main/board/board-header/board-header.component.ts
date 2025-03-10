import { Component } from '@angular/core';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [JoinBtnComponent, FormsModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss'
})
export class BoardHeaderComponent {
  searchInput: string = '';

  constructor(private searchService: SearchService, private router: Router, private navigation: NavigationService){

  }

  /**
   * sets the search Input in the Search Service
   */
  search(){
    this.searchService.setSearchTerm(this.searchInput);
  }

  /**
   * navigates to the add Task Component
   */
  navigateToAddTask(){
    this.router.navigate(['main/addTask']);
    this.navigation.setActive(1, 'addTask')
  }
}
