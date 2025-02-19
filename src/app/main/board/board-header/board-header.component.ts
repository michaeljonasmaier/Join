import { Component } from '@angular/core';
import { JoinBtnComponent } from '../../../shared/join-btn/join-btn.component';

@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [JoinBtnComponent],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.scss'
})
export class BoardHeaderComponent {

}
