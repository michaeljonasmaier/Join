import { Routes } from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { SummaryComponent } from './main/summary/summary.component';
import { AddTaskComponent } from './main/addTask/add-task.component';
import { BoardComponent } from './main/board/board.component';
import { HelpComponent } from './main/help/help.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    {
        path: 'main', component: MainComponent,
        children: [
            { path: '', redirectTo: 'contacts', pathMatch: 'full' },
            { path: 'summary', component: SummaryComponent },
            { path: 'addTask', component: AddTaskComponent },
            { path: 'board', component: BoardComponent },
            { path: 'contacts', component: ContactsComponent },
            { path: 'help', component: HelpComponent },]

    },

];
