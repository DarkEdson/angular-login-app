import { Component, ViewChild, EventEmitter, Output} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private authService: AuthService, private router: Router) { }
  toggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  revisarRegistros(){
    this.router.navigate(['/revisionRegistros']);
  }

  home(){
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout();

  }
}
