import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

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
    const sendUser = JSON.parse(user)
    console.log('PREVIO A ENVIAR', sendUser)
    return this.http.post<any>('http://192.168.1.6:1234/api/usuario/registro', sendUser).toPromise();
  }
}
