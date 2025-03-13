import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideNoopAnimations(), provideRouter(routes, withHashLocation()), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"join-8ad31","appId":"1:56133074371:web:291ce568bdce5614639176","storageBucket":"join-8ad31.firebasestorage.app","apiKey":"AIzaSyC-je28q_3U0hgeAY7Eq9b1KlC6CHGX9BE","authDomain":"join-8ad31.firebaseapp.com","messagingSenderId":"56133074371"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"join-8ad31","appId":"1:56133074371:web:291ce568bdce5614639176","storageBucket":"join-8ad31.firebasestorage.app","apiKey":"AIzaSyC-je28q_3U0hgeAY7Eq9b1KlC6CHGX9BE","authDomain":"join-8ad31.firebaseapp.com","messagingSenderId":"56133074371"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
