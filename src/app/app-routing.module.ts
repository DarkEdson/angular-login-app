import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RevisionRegistrosComponent } from './pages/revision-registros/revision-registros.component';
import { AuthGuard } from './utils/auth.guard';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';
import { WaitingRegisterComponent } from './pages/waiting-register/waiting-register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrarUser', component: RegistrarUsuarioComponent },
  { path: 'waitingRegister', component: WaitingRegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'revisionRegistros', component: RevisionRegistrosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
