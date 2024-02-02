import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  jwtToken: string | null = null;
  jwtTokenObtain: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.jwtToken = sessionStorage.getItem('jwtToken');
  }

  logout() {
    this.authService.logout();
  }

  getJwtToken() {

    this.authService.getCurrentJwtToken().then((token) => {
      this.jwtTokenObtain = token;
      console.log('JWT Token:', token);
    });
    //const jwtToken = this.authService.getCurrentJwtToken();

  }
}
