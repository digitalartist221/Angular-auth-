import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'angular-api';

  isLog !: any;

  constructor(private authService : AuthService, private router : Router){
   
  }

  ngOnInit(): void {
    this.isLog = this.authService.isLoggedIn;
  }
}
