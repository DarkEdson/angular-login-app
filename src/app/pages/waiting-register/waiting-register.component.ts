import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-register',
  templateUrl: './waiting-register.component.html',
  styleUrls: ['./waiting-register.component.scss']
})
export class WaitingRegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['']); // Redirige a la raíz después de 10 segundos
    }, 10000); // 10000 milisegundos = 10 segundos
  }

}
