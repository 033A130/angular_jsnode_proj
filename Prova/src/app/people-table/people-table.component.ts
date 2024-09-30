import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css']
})
export class PeopleTableComponent implements OnInit {
  people: any[] = [];
  newPerson: any = {};
  isAddingNewPerson = false;
  apiUrl = 'http://localhost:3001/people';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.people = data.map(person => ({ ...person, isEditing: false })); // Assicurati che 'isEditing' sia false
      },
      (error) => {
        console.error('Errore nel caricamento delle persone:', error);
      }
    );
  }

  addPerson() {
    this.newPerson = {
      nome: '',
      cognome: '',
      eta: 0,
      email: '',
      codiceFiscale: ''
    };
    this.isAddingNewPerson = true;
  }

  saveNewPerson() {
    if (!this.isFormValid(this.newPerson)) {
      alert('Inserire tutti i campi!');
      return;
    }
    this.http.post(this.apiUrl, this.newPerson).subscribe(
      () => {
        this.loadPeople();
        this.isAddingNewPerson = false;
      },
      (error) => {
        console.error('Errore nel salvataggio:', error);
      }
    );
  }

  cancelAdding() {
    this.isAddingNewPerson = false;
  }

  editPerson(index: number) {
    this.people[index].isEditing = true;
  }

  savePerson(index: number) {
    const person = this.people[index];
    if (!this.isFormValid(person)) {
      alert('Inserire tutti i campi!');
      return;
    }
    this.http.put(`${this.apiUrl}/${person.id}`, person).subscribe(
      () => {
        person.isEditing = false; // Disattiva la modalità di modifica dopo il salvataggio
        this.loadPeople();
      },
      (error) => {
        console.error('Errore nel salvataggio:', error);
      }
    );
  }

  cancelEdit(index: number) {
    this.people[index].isEditing = false; // Disattiva la modifica senza salvare
  }

  deletePerson(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(
      () => {
        this.loadPeople();
      },
      (error) => {
        console.error('Errore nella cancellazione:', error);
      }
    );
  }

  isFormValid(person: any) {
    return person.nome && person.cognome && person.eta && person.email && person.codiceFiscale;
  }
}
