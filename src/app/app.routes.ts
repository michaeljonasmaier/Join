import { Routes } from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';
import { SummaryComponent } from './main/summary/summary.component';
import { AddTaskComponent } from './main/addTask/add-task.component';
import { BoardComponent } from './main/board/board.component';
import { HelpComponent } from './main/help/help.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { LegalnoticeComponent } from './main/legalnotice/legalnotice.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    {
        path: 'main', component: MainComponent, canActivate: [authGuard], 
        children: [
            { path: '', redirectTo: 'board', pathMatch: 'full' },
            { path: 'summary', component: SummaryComponent },
            { path: 'addTask', component: AddTaskComponent },
            { path: 'board', component: BoardComponent },
            { path: 'contacts', component: ContactsComponent },
            { path: 'help', component: HelpComponent },
            { path: 'privacypolicy', component: PrivacyPolicyComponent },
            { path: 'legalnotice', component: LegalnoticeComponent },]

    },
    { path: 'signUp', component: SignUpComponent },
];
