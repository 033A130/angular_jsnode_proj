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
        this.people = data.map(person => ({ ...person, isEditing: false }));
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
      alert('Inserire tutti i campi correttamente!');
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
      alert('Inserire tutti i campi correttamente!');
      return;
    }
    this.http.put(`${this.apiUrl}/${person.id}`, person).subscribe(
      () => {
        person.isEditing = false;
        this.loadPeople();
      },
      (error) => {
        console.error('Errore nel salvataggio:', error);
      }
    );
  }

  cancelEdit(index: number) {
    this.people[index].isEditing = false;
  }

  deletePerson(id: number) {
    const personToDelete = this.people.find(person => person.id === id);
    if (personToDelete) {
      const confirmation = confirm('Sei sicuro di voler eliminare ' + personToDelete.nome + ' ' + personToDelete.cognome + '?');
      if (confirmation) {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe(
          () => {
            this.loadPeople();
          },
          (error) => {
            console.error('Errore nella cancellazione:', error);
          }
        );
      }
    }
  }

  isFormValid(person: any) {
    // Controlla che tutti i campi siano presenti
    if (!person.nome || !person.cognome || !person.eta || !person.email || !person.codiceFiscale) {
      return false;
    }

    // Controllo per Nome e Cognome: solo lettere e spazi
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(person.nome) || !namePattern.test(person.cognome)) {
      return false;
    }

    // Controllo per Età: deve essere un numero positivo
    if (isNaN(person.eta) || person.eta <= 0) {
      return false;
    }

    // Controllo per Email: deve avere un formato valido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(person.email)) {
      return false;
    }

    // Controllo per Codice Fiscale: stringa di lunghezza massima 16, composta da lettere maiuscole e numeri
    const cfPattern = /^[A-Z0-9]{1,16}$/;
    if (!cfPattern.test(person.codiceFiscale)) {
      return false;
    }

    return true; // Tutti i controlli sono passati
  }
}
