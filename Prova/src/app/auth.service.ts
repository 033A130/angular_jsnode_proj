import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private expirationTime: number | null = null;

  // Verifica se l'utente è autenticato
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token && this.isTokenValid();
  }

  // Funzione di login
  login(token: string): void {
    localStorage.setItem('auth_token', token); // Salva il token nel localStorage
    this.setTokenExpiration();
  }

  // Imposta il tempo di scadenza del token a 60 secondi
  private setTokenExpiration(): void {
    this.expirationTime = Date.now() + 60000; // 60 secondi in millisecondi
  }

  // Controlla se il token è valido
  private isTokenValid(): boolean {
    if (this.expirationTime === null) return false;
    return Date.now() < this.expirationTime; // Verifica se il tempo attuale è prima della scadenza
  }

  // Funzione di logout
  logout(): void {
    localStorage.removeItem('auth_token'); // Rimuove il token dal localStorage
    this.expirationTime = null; // Resetta il tempo di scadenza
  }
}
