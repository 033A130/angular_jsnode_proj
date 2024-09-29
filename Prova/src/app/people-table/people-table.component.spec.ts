import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people-table',
  template: `
    <h2>Lista di Persone</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Età</th>
          <th>Email</th>
          <th>Codice Fiscale</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let person of people">
          <td>{{ person.nome }}</td>
          <td>{{ person.cognome }}</td>
          <td>{{ person.eta }}</td>
          <td>{{ person.email }}</td>
          <td>{{ person.codiceFiscale }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    `
  ]
})
export class PeopleTableComponent implements OnInit {
  people: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/people-data.json')
      .subscribe(data => {
        this.people = data;
      }, error => {
        console.error('Errore nel caricamento dei dati:', error);
      });
  }
}