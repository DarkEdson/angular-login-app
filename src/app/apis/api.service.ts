import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://backend-test-dev-tghq.3.us-1.fl0.io/api';
  private baseUrl2 = 'http://67.211.45.199:2302/api'
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private headers2 = new HttpHeaders().set('Content-Type', 'application/json, multipart/form-data');

  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miscelanea/departamento`, { headers: this.headers });
  }
  getMunicipios(idDepartamento: number): Observable<any> {
    // Construir el cuerpo de la solicitud
    const body = { IdDepartamento: idDepartamento };

    // Realizar la solicitud POST a la API de municipios
    return this.http.post<any>('https://backend-test-dev-tghq.3.us-1.fl0.io/api/miscelanea/municipio', body);
  }

  getComunidadLinguistica(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miscelanea/comunidadLinguistica`, { headers: this.headers });
  }
  getPuebloPertenencia(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miscelanea/puebloPertenencia`, { headers: this.headers });
  }
  getSexo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miscelanea/sexo`, { headers: this.headers });
  }
  getEstadoCivil(): Observable<any> {
    return this.http.get(`${this.baseUrl}/miscelanea/estadoCivil`, { headers: this.headers });
  }

  enviarDocumento(nombreDocumento: string): Observable<any> {
    return this.http.post(`${this.baseUrl2}/Documento/Documento`, { Codigo: nombreDocumento }, { headers: this.headers });
  }

  cargarArchivo(archivo: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl2}/Documento/CargaArchivo`, archivo);
  }

}
