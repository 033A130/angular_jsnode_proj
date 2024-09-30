# Progetto Angular - Realizzato da Ignacio Estanislao Pezzana, Alessandro Di Nisio e Renzetti Luca.

Questo progetto Angular include una serie di implementazioni avanzate e professionali volte a migliorare la sicurezza, l'usabilità e l'efficienza complessiva dell'applicazione. Di seguito sono descritte le aggiunte più rilevanti.

## 1. Autenticazione Avanzata con Tentativi Limitati

### Funzionalità:
- Dopo **3 tentativi falliti di login**, l'utente dovrà attendere **3 minuti reali** prima di poter tentare nuovamente l'accesso.
- Durante il periodo di attesa, **le credenziali non saranno valide** e l'utente non potrà bypassare l'attesa anche se ricarica la pagina.
- Questa misura previene attacchi di forza bruta e assicura un controllo rigoroso dei tentativi di login.

### Implementazione:
- Logica implementata in `login.component.ts` per gestire il blocco temporaneo degli utenti dopo tentativi falliti.

## 2. Sicurezza delle Tabelle dei Dati

### Funzionalità:
- La pagina delle tabelle, che gestisce i dati personali, è protetta da possibili **attacchi malevoli**. Qualsiasi tentativo di alterazione dei dati, anche tramite interfacce esterne, è bloccato.
- Implementazione di meccanismi per prevenire **modifiche non autorizzate** ai dati visualizzati.

### Implementazione:
- Gestione robusta degli input e convalida lato client per assicurare che nessuna modifica venga effettuata senza autorizzazione.
- Protezioni aggiuntive contro **injection attacks**.

## 3. Validazione Stringente per la Gestione delle Persone

### Funzionalità:
- Durante l'aggiunta di una nuova persona, è obbligatorio compilare **tutti i campi richiesti** prima che l'utente possa salvare la nuova voce.
- I dati incompleti non possono essere inviati o salvati.

### Implementazione:
- Validazioni implementate a livello di componente per garantire che non si possano aggiungere persone con campi vuoti o incompleti.

## 5. Opzione di Eliminazione Estesa

### Funzionalità:
- Tutti gli utenti, compresi quelli già presenti, possono essere eliminati tramite un'opzione di eliminazione dedicata. Nessun utente è escluso dalla possibilità di essere rimosso dal sistema.

### Implementazione:
- Aggiunta dell'opzione di **eliminazione globale** disponibile per ogni voce della tabella.

## 6. Monitoraggio delle Vulnerabilità

### Funzionalità:
- Il progetto è stato monitorato e aggiornato regolarmente per evitare vulnerabilità di sicurezza, utilizzando il comando `npm audit`.
- Attualmente, non sono presenti vulnerabilità note nel progetto.

### Implementazione:
- Utilizzo di strumenti di auditing come `npm audit` per mantenere le dipendenze sicure e aggiornate.

## 7. Integrazione con `json-server`

### Funzionalità:
- Utilizzo di `json-server` per backend completo, in modo da poter gestire le operazioni CRUD (Creazione, Lettura, Aggiornamento, Eliminazione) senza necessità di un backend reale durante lo sviluppo.

### Implementazione:
- Il file `db.json` funge da database temporaneo per la gestione dei dati durante lo sviluppo.

## 8. Integrazione GitHub Privata

### Funzionalità:
- Il progetto è stato inizializzato con Git e pubblicato su un **repository privato** di GitHub, per gestire la collaborazione e il controllo versione in modo sicuro e riservato.

## Conclusioni

Queste implementazioni mirano a migliorare la sicurezza, l'efficienza e l'usabilità complessiva del progetto, assicurando che il sistema sia robusto, facile da usare e resistente a potenziali attacchi. Ogni aspetto è stato curato con attenzione per offrire un'esperienza utente fluida e una gestione efficace dei dati.
