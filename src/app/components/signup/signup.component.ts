import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
//formulaire

registerForm !: FormGroup;
constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router){

}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      region: ['', Validators.required],
      departement: ['', Validators.required],
      commune: ['', Validators.required],
      adresee: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      role: ['user', Validators.required],  // Default role to 'user'
       });
  }

  //soumission de (submit)

  onRegister(){

    console.log("ici");
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error', error);
        }
      );
  }

}
