import { Component, OnInit,ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {

  }

  logout(): void {
    this.authService.logout();

  }


}
