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
  lockoutTime: number = 180000; // Tempo di blocco in millisecondi (3 minuti)
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

    // Verifica se l'username è valido (escludendo caratteri speciali)
    if (!this.isValidUsername(this.username)) {
      alert('Il nome utente non può contenere caratteri speciali!');
      return;
    }

    // Chiamata al server per verificare le credenziali
    this.http.get<any[]>(`http://localhost:3000/users?username=${this.username}&password=${this.password}`)
      .subscribe({
        next: users => {
          if (users.length > 0) {
            // Presumiamo che l'ID utente o il token sia da prendere in qualche modo dal server
            this.authService.login(users[0].id); // Usa l'ID dell'utente come token
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

  // Funzione per validare l'username
  isValidUsername(username: string): boolean {
    const regex = /^[a-zA-Z0-9]+$/; // Solo lettere e numeri
    return regex.test(username);
  }

  // Funzione per disconnettere l'utente
  onLogout() {
    this.authService.logout(); // Usa l'AuthService per rimuovere il token
    this.router.navigate(['/login']); // Reindirizza alla pagina di login
  }

  navigateToHome() {
    this.router.navigate(['home']);
  }
}
