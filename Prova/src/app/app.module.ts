import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Necessario per [(ngModel)]
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';  // Routing configurato
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PeopleTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,   // Per gestire [(ngModel)]
    HttpClientModule  // Per chiamate HTTP
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
