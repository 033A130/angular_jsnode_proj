import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // Verifica autenticazione
    console.log('User authenticated:', isAuthenticated); // Log per debug
    if (isAuthenticated) {
      return true; // L'utente è autenticato
    } else {
      this.router.navigate(['/login']); // Reindirizza al login se non autenticato
      return false;
    }
  }
}
