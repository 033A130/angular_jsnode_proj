import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-table',
  template: `
    <h2>Lista di Persone</h2>
    <button class="add-button" (click)="addPerson()">Aggiungi</button>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Età</th>
          <th>Email</th>
          <th>Codice Fiscale</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let person of people; let i = index">
          <td>
            <input *ngIf="person.isEditing" [(ngModel)]="person.nome" />
            <span *ngIf="!person.isEditing">{{ person.nome }}</span>
          </td>
          <td>
            <input *ngIf="person.isEditing" [(ngModel)]="person.cognome" />
            <span *ngIf="!person.isEditing">{{ person.cognome }}</span>
          </td>
          <td>
            <input *ngIf="person.isEditing" [(ngModel)]="person.eta" type="number" />
            <span *ngIf="!person.isEditing">{{ person.eta }}</span>
          </td>
          <td>
            <input *ngIf="person.isEditing" [(ngModel)]="person.email" />
            <span *ngIf="!person.isEditing">{{ person.email }}</span>
          </td>
          <td>
            <input *ngIf="person.isEditing" [(ngModel)]="person.codiceFiscale" />
            <span *ngIf="!person.isEditing">{{ person.codiceFiscale }}</span>
          </td>
          <td>
            <button class="edit-button" (click)="editPerson(i)" *ngIf="!person.isEditing">Modifica</button>
            <button class="save-button" (click)="savePerson(i)" *ngIf="person.isEditing">Salva</button>
            <button class="cancel-button" (click)="cancelEdit(i)" *ngIf="person.isEditing">Annulla</button>
            <button class="delete-button" (click)="deletePerson(i)">Elimina</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }

      td button {
        margin-right: 5px;
      }

      button {
        padding: 8px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-bottom: 5px;
      }

      .add-button {
        background-color: #00ca7d;
        color: white;
        margin-bottom: 10px;
      }

      .add-button:hover {
        background-color: #28ff9a;
      }

      .edit-button {
        background-color: #11ab70;
        color: white;
      }

      .edit-button:hover {
        background-color: #17d487;
      }

      .save-button {
        background-color: #007bff;
        color: white;
      }

      .save-button:hover {
        background-color: #0056b3;
      }

      .cancel-button {
        background-color: #ff6f61;
        color: white;
      }

      .cancel-button:hover {
        background-color: #ff4a39;
      }

      .delete-button {
        background-color: red;
        color: white;
      }

      .delete-button:hover {
        background-color: #ff4d4d;
      }
    `
  ]
})
export class PeopleTableComponent implements OnInit {
  people: any[] = [];
  originalPerson: any = null;

  constructor() {}

  ngOnInit() {
    const savedPeople = localStorage.getItem('people');
    this.people = savedPeople ? JSON.parse(savedPeople) : this.getInitialPeople();
  }

  getInitialPeople() {
    return [
      { nome: 'Mario', cognome: 'Rossi', eta: 30, email: 'mario.rossi@example.com', codiceFiscale: 'RSSMRA30A01H501Z', isEditing: false },
      { nome: 'Luigi', cognome: 'Verdi', eta: 25, email: 'luigi.verdi@example.com', codiceFiscale: 'VRDLGU25A01H501Z', isEditing: false },
      { nome: 'Anna', cognome: 'Bianchi', eta: 28, email: 'anna.bianchi@example.com', codiceFiscale: 'BNCNNN28A01H501Z', isEditing: false },
      { nome: 'Carla', cognome: 'Neri', eta: 35, email: 'carla.neri@example.com', codiceFiscale: 'NRICRL35A01H501Z', isEditing: false },
      { nome: 'Paolo', cognome: 'Blu', eta: 40, email: 'paolo.blu@example.com', codiceFiscale: 'BLUPPL40A01H501Z', isEditing: false },
      { nome: 'Gina', cognome: 'Gialli', eta: 33, email: 'gina.gialli@example.com', codiceFiscale: 'GLIGNN33A01H501Z', isEditing: false },
      { nome: 'Franco', cognome: 'Azzurri', eta: 27, email: 'franco.azzurri@example.com', codiceFiscale: 'AZZFRN27A01H501Z', isEditing: false },
      { nome: 'Laura', cognome: 'Rosa', eta: 22, email: 'laura.rosa@example.com', codiceFiscale: 'RSALRA22A01H501Z', isEditing: false },
      { nome: 'Sara', cognome: 'Grigi', eta: 29, email: 'sara.grigi@example.com', codiceFiscale: 'GRGSRR29A01H501Z', isEditing: false },
      { nome: 'Giovanni', cognome: 'Marrone', eta: 37, email: 'giovanni.marrone@example.com', codiceFiscale: 'MRNGNN37A01H501Z', isEditing: false }
    ];
  }

  addPerson() {
    const newPerson = {
      nome: '',
      cognome: '',
      eta: 0,
      email: '',
      codiceFiscale: '',
      isEditing: true
    };
    this.people.push(newPerson);
    this.updateLocalStorage();
  }

  editPerson(index: number) {
    this.originalPerson = { ...this.people[index] };
    this.people[index].isEditing = true;
  }

  savePerson(index: number) {
    const person = this.people[index];

    if (!person.nome || !person.cognome || !person.eta || !person.email || !person.codiceFiscale) {
      alert('Inserire tutti i campi!');
      return;
    }

    person.isEditing = false;
    this.updateLocalStorage();
  }  

  cancelEdit(index: number) {
    this.people[index] = this.originalPerson;
    this.people[index].isEditing = false;
    this.updateLocalStorage();
  }

  deletePerson(index: number) {
    if (confirm('Sei sicuro di voler eliminare questa persona?')) {
      this.people.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  updateLocalStorage() {
    localStorage.setItem('people', JSON.stringify(this.people));
  }
}