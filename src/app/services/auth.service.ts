import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-je28q_3U0hgeAY7Eq9b1KlC6CHGX9BE",
  authDomain: "join-8ad31.firebaseapp.com",
  projectId: "join-8ad31",
  storageBucket: "join-8ad31.firebasestorage.app",
  messagingSenderId: "56133074371",
  appId: "1:56133074371:web:291ce568bdce5614639176"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logInSuccessfull: boolean = false;
  constructor() {

  }

  // Methode für die Registrierung
  signUp(email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        throw error;
      });
  }

  showUser() {
    console.log(user);
  }

  signIn(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }
}
