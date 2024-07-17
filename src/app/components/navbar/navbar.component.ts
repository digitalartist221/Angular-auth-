import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLog!: any ;

  authSubscription!: Subscription;
  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
   this.isLog = this.authService.isLoggedIn();
   // Subscribe to the authStatus observable to get login status updates
   this.authSubscription = this.authService.authStatus$.subscribe(
    status => {
      this.isLog = status;
    }
  );
  }

  ngOnDestroy() {
    // Unsubscribe from the authStatus observable when component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


  logout(){
    this.authService.logout();

    this.router.navigate(['/login']);
  }


}
