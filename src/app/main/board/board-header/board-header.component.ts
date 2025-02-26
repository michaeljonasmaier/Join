import { Component } from '@angular/core';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [JoinBtnComponent, FormsModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss'
})
export class BoardHeaderComponent {
  searchInput: string = '';

  constructor(private searchService: SearchService){

  }

  search(){
    this.searchService.setSearchTerm(this.searchInput);
  }
}
