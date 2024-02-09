import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../apis/api.service';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from '../../models/userRegister.model';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  userForm: FormGroup;

  user: UserRegister = new UserRegister();
  adjuntarCUI: any;
  fileName!: string;

  //listas
  departamentos: any[] = [];
  municipios: any[] = [];
  comunidadesLinguisticas: any[] = [];
  pueblosPertenencia: any[] = [];
  sexos: any[] = [];
  estadosCivil: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService,private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      Nombres: [this.user.nombres, Validators.required],
      Apellidos: [this.user.apellidos, Validators.required],
      Email: [this.user.correoElectronico, [Validators.required, Validators.email]],
      Usuario: [this.user.Usuario], // Usuario requerido
      IdGuid: [this.user.IdGuid], // IdGuid requerido
      NoDocumento: [this.user.cui, Validators.required], // CUI requerido
      FechaNacimiento: [this.user.fechaNacimiento], // Fecha de Nacimiento requerida
      IdEstadoCivil: [this.user.estadoCivil, Validators.required], // Estado Civil requerido
      Ocupacion: [this.user.ocupacion, Validators.required], // Ocupación requerida
      IdComunidadLinguistica: [this.user.comunidadLinguistica, Validators.required], // Comunidad Lingüística requerida
      IdPuebloPertenencia: [this.user.puebloPertenencia, Validators.required], // Pueblo de Pertenencia requerido
      PalabraClave: [this.user.contrasena, Validators.required], // Contraseña requerida
      confirmarContrasena: [this.user.confirmarContrasena, Validators.required], // Confirmar Contraseña requerido
      Telefono: [this.user.telefono, Validators.required], // Teléfono requerido
      Whatsapp: [this.user.whatsapp], // Whatsapp requerido
      DireccionNotificacion: [this.user.direccionNotificacion, Validators.required], // Dirección de Notificación requerida
      IdDepartamento: [this.user.departamento, Validators.required], // Departamento requerido
      IdMunicipio: [this.user.municipio, Validators.required], // Municipio requerido
      IdSexo: [this.user.sexo, Validators.required], // Sexo requerido
      DocumentoNube: [this.user.DocumentoNube], // DocumentoNube requerido
      fechaSelect: [this.user.fechaSelect, Validators.required],
      Estado: [false],
      IdColaborador: [0],
      NotificacionWhatsapp: [false],
      DocumentoIdTipo: [1]
    });
   }


   get f() { return this.userForm.controls; }

  ngOnInit(): void {

    this.getDepartamentos();
    this.getComunidadLinguistica();
    this.getPuebloPertenencia()
    this.getSexo()
    this.getEstadoCivil()
  }
  async registrarUsuario() {

    if (this.userForm.value.PalabraClave === this.userForm.value.confirmarContrasena) {
    if (this.userForm.valid && this.adjuntarCUI != null) {
      // Si el formulario es válido, envía los datos al servidor
      const formData = this.userForm.value;
    console.log('Formulario antes de enviar:', formData);

    // Convierte el objeto formData a JSON

      let fechaFormat: string = this.guardarFechaSeleccionada(formData.fechaSelect)
      formData.FechaNacimiento = fechaFormat
      formData.Usuario = formData.Email
      formData.DocumentoNube = this.fileName
      if (formData.Whatsapp != ''){
        formData.NotificacionWhatsapp = true;
      }
    console.log('Registrando usuario...', formData);
    delete formData.fechaSelect
    delete formData.confirmarContrasena
    const formDataJSON = JSON.stringify(formData);
    console.log('Formulario convertido a JSON:', formDataJSON);
     let response = await this.authService.register(formDataJSON)
    if (response){
    console.log(response)
      this.router.navigate(['/waitingRegister']);
    }

    } else {
      // Si el formulario no es válido, muestra un mensaje de error o realiza otras acciones
      console.error('El formulario es inválido. Por favor, complete todos los campos correctamente.');
    }}else {
      // Si el formulario no es válido, muestra un mensaje de error o realiza otras acciones
      console.error('contraseñas no iguales.');
    }



  }

  submitForm() {
    this.registrarUsuario();
  }

  onFileSelected(event: any) {
    this.adjuntarCUI = event.target.files[0];
    if (this.adjuntarCUI) {
      this.cargarArchivo(this.adjuntarCUI)
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

  enviarDocumento(nombreDocumento: string) {
    this.apiService.enviarDocumento(nombreDocumento).subscribe(
      response => {
        console.log('Respuesta de enviarDocumento:', response);
      },
      error => {
        console.error('Error al enviar el documento:', error);
      }
    );
  }

  async cargarArchivo(archivo: File)  {
    const formData = new FormData();
    formData.append('DocumentoAdjunto', archivo);

    const resp = await this.apiService.cargarArchivo(formData).toPromise()
    this.fileName = resp.data;
    this.enviarDocumento(resp.data)
  }

}
