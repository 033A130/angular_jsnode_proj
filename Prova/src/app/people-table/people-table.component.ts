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
    const { isValid, errorFields } = this.isFormValid(this.newPerson);
    if (!isValid) {
      alert('I campi con errori sono: ' + errorFields.join(', '));
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
    const { isValid, errorFields } = this.isFormValid(person);
    if (!isValid) {
      alert('I campi con errori sono: ' + errorFields.join(', '));
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

  isFormValid(person: any): { isValid: boolean, errorFields: string[] } {
    const errorFields: string[] = [];

    // Controllo per campi vuoti
    if (!person.nome) errorFields.push('Nome');
    if (!person.cognome) errorFields.push('Cognome');
    if (!person.eta || person.eta <= 0) errorFields.push('Età');
    if (!person.email) errorFields.push('Email');
    if (!person.codiceFiscale) errorFields.push('Codice Fiscale');

    // Controllo per Nome e Cognome: solo lettere e spazi
    const namePattern = /^[A-Za-z\s]+$/;
    if (person.nome && !namePattern.test(person.nome)) errorFields.push('Nome');
    if (person.cognome && !namePattern.test(person.cognome)) errorFields.push('Cognome');

    // Controllo per Email: deve avere un formato valido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (person.email && !emailPattern.test(person.email)) errorFields.push('Email');

    // Controllo per Codice Fiscale: stringa di lunghezza massima 16, composta da lettere maiuscole e numeri
    const cfPattern = /^[A-Z0-9]{1,16}$/;
    if (person.codiceFiscale && !cfPattern.test(person.codiceFiscale)) errorFields.push('Codice Fiscale');

    return { isValid: errorFields.length === 0, errorFields };
  }
}
