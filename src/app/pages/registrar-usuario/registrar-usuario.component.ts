import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apis/api.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../models/userRegister.model';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  user: UserRegister = new UserRegister();
  adjuntarCUI: any;

  //listas
  departamentos: any[] = [];
  municipios: any[] = [];
  comunidadesLinguisticas: any[] = [];
  pueblosPertenencia: any[] = [];
  sexos: any[] = [];
  estadosCivil: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {

    this.getDepartamentos();
    this.getComunidadLinguistica();
    this.getPuebloPertenencia()
    this.getSexo()
    this.getEstadoCivil()
  }
  async registrarUsuario() {
    let fechaFormat: string = this.guardarFechaSeleccionada(this.user.fechaSelect)
    this.user.fechaNacimiento = fechaFormat
    console.log('Registrando usuario...', this.user);
    // let response = await this.authService.register(jsonRegister)
    // if (response){
    // console.log(response)
    //   this.router.navigate(['/waitingRegister']);
    // }

  }

  onFileSelected(event: any) {
    this.adjuntarCUI = event.target.files[0];
    if (this.adjuntarCUI) {
      console.log('Archivo seleccionado:', this.adjuntarCUI);
    }
  }

  getDepartamentos() {
    this.apiService.getDepartamentos().subscribe(
      response => {
        this.departamentos = response.data;
        console.log('DEPTOS', this.departamentos)
      },
      error => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }
  getComunidadLinguistica() {
    this.apiService.getComunidadLinguistica().subscribe(
      response => {
        this.comunidadesLinguisticas = response.data;
      },
      error => {
        console.error('Error al obtener las comunidadesLinguisticas:', error);
      }
    );
  }
  getPuebloPertenencia() {
    this.apiService.getPuebloPertenencia().subscribe(
      response => {
        this.pueblosPertenencia = response.data;
      },
      error => {
        console.error('Error al obtener los pueblos Pertenencia:', error);
      }
    );
  }
  getSexo() {
    this.apiService.getSexo().subscribe(
      response => {
        this.sexos = response.data;
      },
      error => {
        console.error('Error al obtener los sexos:', error);
      }
    );
  }
  getEstadoCivil() {
    this.apiService.getEstadoCivil().subscribe(
      response => {
        this.estadosCivil = response.data;
      },
      error => {
        console.error('Error al obtener los estados Civil:', error);
      }
    );
  }
  getMunicipios() {
    if (this.user.departamento > 0) {
      this.apiService.getMunicipios(this.user.departamento).subscribe(
        response => {
          this.municipios = response.data;
          console.log('MUNI',this.municipios)
        },
        error => {
          console.error('Error al obtener los municipios:', error);
        }
      );
    }
  }

  onDepartamentoSeleccionado(event: any) {
    console.log('CAMBIO',event)
    this.user.departamento = event.value;
    this.getMunicipios();
  }

  guardarFechaSeleccionada(fecha: Date | null): string {
    console.log('GUARDAR FECHA?')
    if (fecha) {
      let fechaF = new Date(fecha);
      const dia = (fechaF.getDate() + 1).toString().padStart(2, '0');
      const mes = (fechaF.getMonth() + 1).toString().padStart(2, '0');
      return   `${dia}/${mes}/${fechaF.getFullYear()}`

    }
    else {
      return '01/01/1990'
    }
  }

}
