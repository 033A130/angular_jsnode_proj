import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permetti l'accesso se l'utente è autenticato
    } else {
      this.router.navigate(['/login']); // Reindirizza alla pagina di login se non autenticato
      return false; // Blocca l'accesso
    }
  }
}
