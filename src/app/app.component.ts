import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent, ContactsComponent, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'join';
}
