import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Stato di autenticazione

  constructor() {}

  // Funzione per effettuare il login
  login(token: string): void {
    this.loggedIn = true;
    // Qui puoi aggiungere la logica per salvare il token, ad esempio in localStorage
    localStorage.setItem('authToken', token);
  }

  // Funzione per effettuare il logout
  logout(): void {
    this.loggedIn = false;
    // Rimuovi il token dal localStorage
    localStorage.removeItem('authToken');
  }

  // Funzione per verificare se l'utente è autenticato
  isAuthenticated(): boolean {
    return this.loggedIn; // Restituisce lo stato di autenticazione
  }

  // Metodo pubblico per ottenere lo stato di login
  public isLoggedIn(): boolean {
    return this.loggedIn; // Restituisce il valore della proprietà loggedIn
  }
}
