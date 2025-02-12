import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-join-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-btn.component.html',
  styleUrl: './join-btn.component.scss'
})
export class JoinBtnComponent {
  @Input() title: string = 'Default';
  @Input() imgPath: string = '';
}
