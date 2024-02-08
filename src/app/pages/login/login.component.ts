import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).then(() => {
       this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.error('Error al iniciar sesión:', error);
    });
  }
  crearUsuario(){
    this.router.navigate(['/registrarUser']);
  }
}
