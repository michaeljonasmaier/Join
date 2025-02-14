import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, NavbarComponent, HeaderComponent, ContactsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
