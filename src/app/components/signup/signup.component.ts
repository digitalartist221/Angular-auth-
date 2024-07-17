import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
//formulaire

form !: FormGroup;
constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router){

}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name : '',
      email: '',
      password : ''
    });
  }

  //soumission de (submit)

  submit(){

    this.authService.register('http://127.0.0.1:8000/api/register').subscribe(res => {
      //console.log(res);
      this.router.navigate(['/login']); // on redirige
    });

  }

}
