import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  message= "you are logged in";

  user : any;

  constructor(private http : HttpClient, private authService : AuthService){

  }
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      data => {
        this.user = data;
        console.log(data)
        
  this.message = `hi ${this.user.name}`;
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
}

}
