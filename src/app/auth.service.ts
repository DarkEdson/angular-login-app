import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, getIdToken } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      return getIdToken(user).then((token) => {
        sessionStorage.setItem('jwtToken', token);
        return userCredential;
      });
    });
  }

  logout() {
    const auth = getAuth();
    return signOut(auth).then(() => {
      this.router.navigate(['']);
    });
  }

  isLoggedIn() {
    const auth = getAuth();
    return new Promise<User | null>((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });
  }

  getCurrentJwtToken() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return getIdToken(user);
    }

    return Promise.resolve(null);
  }
}
