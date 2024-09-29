import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token'); // Restituisce true se il token esiste
  }

  // Funzione di login
  login(token: string): void {
    localStorage.setItem('auth_token', token); // Salva il token nel localStorage
  }

  // Funzione di logout
  logout(): void {
    localStorage.removeItem('auth_token'); // Rimuove il token dal localStorage
  }
}
