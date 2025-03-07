import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  constructor(private navigation: NavigationService){

  }

  backToLastRoute(){
    this.navigation.setActive(this.navigation.lastRoute.index, this.navigation.lastRoute.route);
  }
}
