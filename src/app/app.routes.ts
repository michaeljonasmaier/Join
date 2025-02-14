import { Routes } from '@angular/router';
import { ContactsComponent } from './main/contacts/contacts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'main', component: MainComponent },
];
