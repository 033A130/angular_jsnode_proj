import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Modulo per le chiamate HTTP
import { AppRoutingModule } from './app-routing.module';  // Modulo per il routing

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PeopleTableComponent } from './people-table/people-table.component';

@NgModule({
  declarations: [
    AppComponent,           // Componente principale
    LoginComponent,         // Componente per il login
    HomeComponent,          // Componente per la home page
    PeopleTableComponent    // Componente per la tabella delle persone
  ],
  imports: [
    BrowserModule,          // Modulo per il browser
    FormsModule,            // Modulo per i form, per gestire input e form binding
    HttpClientModule,       // Modulo per eseguire richieste HTTP
    AppRoutingModule        // Modulo di routing per la navigazione tra componenti
  ],
  providers: [],
  bootstrap: [AppComponent]  // Avvio con AppComponent
})
export class AppModule { }
