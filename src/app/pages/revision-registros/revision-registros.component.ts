import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface UserData {
  index: number;
  email: string;
  fullName: string;
}

@Component({
  selector: 'app-revision-registros',
  templateUrl: './revision-registros.component.html',
  styleUrls: ['./revision-registros.component.scss']
})
export class RevisionRegistrosComponent implements OnInit {

  displayedColumns: string[] = ['index', 'email', 'fullName', 'actions'];
  dataSource: UserData[] = [
    {index: 1, email: 'user1@example.com', fullName: 'John Doe'},
    {index: 2, email: 'user2@example.com', fullName: 'Jane Smith'},
    // Agrega más datos aquí según sea necesario
  ];

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  viewUser(user: UserData) {
    // Lógica para visualizar el usuario
    console.log('Visualizar usuario:', user);
  }

  approveUser(user: UserData) {
    // Lógica para aprobar el usuario
    console.log('Aprobar usuario:', user);
  }

  denyUser(user: UserData) {
    // Lógica para denegar el usuario
    console.log('Denegar usuario:', user);
  }

}
