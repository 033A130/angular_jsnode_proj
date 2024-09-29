import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { AuthGuard } from './auth.guard';  // Importa la guardia

const routes: Routes = [
  { path: '', component: HomeComponent },  // Rotta per la home
  { path: 'login', component: LoginComponent },  // Rotta per il login
  { path: 'people', component: PeopleTableComponent, canActivate: [AuthGuard] }, // Proteggi la rotta con AuthGuard
  { path: '**', redirectTo: '/' } // Rotta di fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
