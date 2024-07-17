import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
//formulaire

form !: FormGroup;
isLog !: any;
constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router){

}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : '',
      password: ''
    });
    this.isLog = this.authService.isLoggedIn();
    if(this.isLog = true){
      this.router.navigate(['/home'])
    }
  }

  //soumission de (submit)

  submit(){
    console.log(this.form.getRawValue())
    //on recuperer les cookie du baxkend withcrendtiel tru
    this.authService.login(this.form.getRawValue())
    .subscribe(() => {
    //  console.log(res);
      this.router.navigate(['/home']);
      
    });

  }

}
