import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginAttempts: number = 0; // Contatore dei tentativi di login
  maxAttempts: number = 5; // Numero massimo di tentativi consentiti
  lockoutTime: number = 300000; // Tempo di blocco in millisecondi (es. 5 minuti)
  locked: boolean = false;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  onLogin() {
    if (this.locked) {
      alert('Troppi tentativi di login falliti. Attendi qualche minuto prima di riprovare.');
      return;
    }

    // Verifica se i campi sono vuoti
    if (!this.username.trim() || !this.password.trim()) {
      alert('Username e password sono obbligatori');
      return;
    }

    // Chiamata al server per verificare le credenziali
    this.http.get<any[]>(`http://localhost:3000/users?username=${this.username}&password=${this.password}`)
      .subscribe({
        next: users => {
          if (users.length > 0) {
            this.authService.login('1234567890'); // In un'app reale, questo sarebbe un vero token
            this.router.navigate(['/people']); // Reindirizza alla pagina protetta
          } else {
            this.loginAttempts++;
            if (this.loginAttempts >= this.maxAttempts) {
              this.locked = true;
              setTimeout(() => {
                this.locked = false;
                this.loginAttempts = 0;
              }, this.lockoutTime);
              alert('Troppi tentativi falliti. Il tuo account è stato bloccato temporaneamente.');
            } else {
              alert(`Credenziali errate. Tentativi rimanenti: ${this.maxAttempts - this.loginAttempts}`);
            }
          }
        },
        error: err => {
          console.error('Errore nella chiamata al server:', err);
          alert('Errore di connessione, riprova più tardi');
        }
      });
  }

  // Funzione per disconnettere l'utente
  onLogout() {
    this.authService.logout(); // Usa l'AuthService per rimuovere il token
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
