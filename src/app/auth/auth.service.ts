import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const loginData = { usuario: email, palabraClave: password };
    return this.http.post<any>('https://backend-test-dev-tghq.3.us-1.fl0.io/api/usuario/login', loginData).toPromise()
      .then((response) => {
        sessionStorage.setItem('jwtToken', response.data.token);
        return response;
      });
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('jwtToken');
  }

  getCurrentJwtToken() {
    return sessionStorage.getItem('jwtToken');
  }

  register(user: any) {
    return this.http.post<any>('https://backend-test-dev-tghq.3.us-1.fl0.io/api/usuario/registro', user)
      .toPromise();
  }
}
