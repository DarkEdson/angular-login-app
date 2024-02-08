import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener la URL de la solicitud
    const requestUrl = request.url.toLowerCase();

    // Verificar si la solicitud se realiza a la API de autenticación
    if (requestUrl.includes('usuario/login')) {
      // Si es una solicitud de inicio de sesión, no agregar el token JWT
      return next.handle(request);
    }

    // Obtener el token JWT actual del servicio de autenticación
    const jwtToken = this.authService.getCurrentJwtToken();

    // Si hay un token JWT, adjuntarlo a la cabecera de autorización de la solicitud
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
    }

    // Continuar con la solicitud modificada
    return next.handle(request);
  }
}
