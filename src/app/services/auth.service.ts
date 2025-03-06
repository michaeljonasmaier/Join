import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { UserInterface } from '../interfaces/user';

const firebaseConfig = {
  apiKey: "AIzaSyC-je28q_3U0hgeAY7Eq9b1KlC6CHGX9BE",
  authDomain: "join-8ad31.firebaseapp.com",
  projectId: "join-8ad31",
  storageBucket: "join-8ad31.firebasestorage.app",
  messagingSenderId: "56133074371",
  appId: "1:56133074371:web:291ce568bdce5614639176"
};

const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  logInSuccessfull: boolean = false;
  currentUser: UserInterface | null = { name: "", email: "" };
  constructor() {
  }

  // Methode für die Registrierung
  signUp(name: string, email: string, password: string): Promise<any> {
    const auth = getAuth();
    const user = auth.currentUser;
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.updateUserProfile(name)
        return userCredential.user;
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        throw error;
      });
  }

  signIn(email: string, password: string): Promise<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.createUserObject(user);
        this.getCurrentUser();
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.getCurrentUser();
      this.currentUser = null;
    }).catch((error) => {
      // An error happened.
    });
  }

  
  getCurrentUser(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
      }
    });
  }
  

updateUserProfile(displayName: string): Promise < boolean > {
  const auth = getAuth();
  const user = auth.currentUser;
  if(!user) {
    return Promise.resolve(false);
  }
    return updateProfile(user, { displayName: displayName })
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
}

createUserObject(userObj: any){
  this.currentUser = {
    name: userObj.displayName,
    email: userObj.email,
  }
}

  
}
