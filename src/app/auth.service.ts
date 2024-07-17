import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /***
   * Service d'authentification : Utilisez un BehaviorSubject pour suivre l'état d'authentification et émettre des événements lorsque l'état change.
Composant Navbar : Souscrivez à authStatus$ pour réagir aux changements d'état d'authentification et mettre à jour l'interface utilisateur.
Déconnexion : Lorsque l'utilisateur se déconnecte, le BehaviorSubject émet un nouvel état, ce qui met à jour automatiquement la barre de navigation.
   */
  private baseUrl = 'http://127.0.0.1:8000/api';
  private jwtHelper = new JwtHelperService();

  // BehaviorSubject to track authentication status
  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  // Observable to expose authStatus to other components
  authStatus$ = this.authStatus.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);

        this.authStatus.next(true); // Emit true indicating user is logged in
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }
}
