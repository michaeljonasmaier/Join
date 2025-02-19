import { Component } from '@angular/core';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BoardContentComponent } from './board-content/board-content.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [BoardHeaderComponent, BoardContentComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
