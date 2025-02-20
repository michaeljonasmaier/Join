import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ContactsComponent } from './main/contacts/contacts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { AddTaskComponent } from './main/addTask/add-task.component';
import { SummaryComponent } from './main/summary/summary.component';
import { BoardComponent } from './main/board/board.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingPageComponent, MainComponent, RouterOutlet, AddTaskComponent, FormsModule,ReactiveFormsModule , SummaryComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'join';
}
