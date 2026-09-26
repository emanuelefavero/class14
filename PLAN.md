# Class14 — Direzione del progetto

## Visione generale

**Class14** è una piattaforma dedicata alla classe del corso Web Development.

L'applicazione deve avere principalmente due anime:

1. **Learning Hub** — piattaforma per gli studenti, utile durante e dopo il corso.
2. **Student Showcase** — spazio dove mostrare il percorso, i progetti e i risultati ottenuti dagli studenti.

La direzione principale deve essere quella del **Learning Hub**.

La parte Showcase deve integrarsi naturalmente nella piattaforma senza trasformarla in una competizione o in una classifica degli studenti.

L'obiettivo è creare una piattaforma che possa essere utile:

- durante il corso;
- per prepararsi all'esame finale;
- per ripassare prima dei colloqui;
- dopo la fine del corso;
- come ricordo del percorso fatto insieme;
- come showcase dei progetti e delle competenze sviluppate;
- eventualmente anche per recruiter e aziende interessati agli studenti.

---

## 1. Learning Hub

Questa deve essere l'identità principale dell'applicazione.

La piattaforma raccoglie in un unico posto tutto ciò che è stato prodotto e studiato durante il corso.

### Sezioni principali

#### Projects

Raccoglie tutti i progetti svolti durante il corso.

Ogni progetto può avere:

- titolo;
- descrizione;
- immagine;
- data o periodo;
- tecnologie utilizzate;
- argomenti collegati;
- repository originale dell'esercizio;
- studenti che lo hanno completato;
- repository GitHub dei singoli studenti;
- eventuali statistiche GitHub.

Esempio:

```text
Boolflix

React • API • Components • Props • State

Completed by 12 students

[Student] [Student] [Student] ...

Repository / Details
```

---

#### Students

Pagina che raccoglie gli studenti della classe.

Ogni studente deve avere un proprio profilo.

Possibili informazioni:

- nome;
- avatar;
- GitHub username;
- link GitHub;
- breve bio opzionale;
- tecnologie;
- progetti completati;
- repository;
- statistiche GitHub;
- progetto finale.

La pagina dello studente deve funzionare anche come piccolo **developer profile**.

---

#### Topics

Raccoglie gli argomenti affrontati durante il corso.

Esempi:

- HTML
- CSS
- JavaScript
- React
- Node.js
- Express
- REST API
- MySQL
- Database
- Git
- GitHub

Ogni topic può avere:

- descrizione;
- concetti principali;
- progetti collegati;
- cheat sheet collegati;
- risorse;
- link alla documentazione;
- eventuali esercizi.

Esempio:

```text
React

Projects
→ React Boolflix
→ React Blog
→ Context Exercise

Cheat Sheets
→ React Basics
→ Hooks
→ React Router

Resources
→ React Documentation
```

Questo permette di navigare la piattaforma anche per **argomento**, non solamente per progetto.

---

## 2. Cheat Sheets

Una parte importante dell'applicazione deve essere dedicata ai cheat sheet prodotti durante il corso.

Ogni cheat sheet può avere:

- titolo;
- descrizione;
- argomento;
- PDF;
- data;
- eventuale preview;
- pulsante download.

Esempio:

```text
React Hooks Cheat Sheet

React • useState • useEffect • Context

[Preview]

View PDF
Download
```

I cheat sheet devono essere collegabili ai relativi **Topics**.

Per esempio:

```text
Topic: React
    ↓
React Hooks Cheat Sheet
```

---

## 3. Resources

Creare una sezione dedicata alle risorse utili.

Possibili categorie:

- Official Documentation
- Tools
- Tutorials
- Articles
- Practice
- Interview Preparation

Esempi:

```text
React Documentation
MDN
Node.js Documentation
Express Documentation
MySQL Documentation
JavaScript.info
GitHub
```

Ogni risorsa può essere associata a uno o più Topics.

---

## 4. Student Showcase

La seconda anima dell'applicazione deve essere quella dello **Student Showcase**.

L'obiettivo NON deve essere stabilire chi è "il migliore della classe".

L'obiettivo deve essere:

> Mostrare cosa ha realizzato ogni studente durante il corso.

Questo rende la piattaforma potenzialmente interessante anche per recruiter e aziende.

---

### Student Profile

Il profilo dello studente potrebbe mostrare qualcosa come:

```text
Emanuele

24 / 24 Projects Completed

React
Node.js
Express
MySQL

GitHub Activity

Repositories: 24
Commits: 387

Projects

✓ Boolflix
✓ Boolpress
✓ React Blog
✓ Express Blog API
✓ DB University
...
```

Un recruiter può quindi capire velocemente:

- quali tecnologie ha utilizzato lo studente;
- quanti progetti ha completato;
- quali repository possiede;
- quale progetto finale ha sviluppato;
- il percorso fatto durante il corso.

---

## 5. GitHub Integration

Quando possibile utilizzare la GitHub API per recuperare automaticamente informazioni pubbliche.

Possibili dati:

- repository;
- commit;
- link repository;
- ultimo aggiornamento;
- linguaggi utilizzati;
- GitHub avatar.

Per ogni progetto si potrebbe mostrare:

```text
Students who completed this project

Emanuele
Repository
34 commits

Francesco
Repository
27 commits

Filippo
Repository
22 commits
```

Questi dati devono essere trattati come **statistiche del progetto**, non come misura assoluta della qualità dello sviluppatore.

---

## 6. Evitare una leaderboard competitiva

Evitare come feature principale una classifica globale del tipo:

```text
1. Student A — 600 commits
2. Student B — 420 commits
3. Student C — 310 commits
```

Questo rischierebbe di trasformare il progetto in una competizione tra studenti.

Inoltre metriche come:

- numero di commit;
- linee di codice;
- numero di repository;

non rappresentano necessariamente la qualità di uno sviluppatore.

Preferire invece statistiche individuali e aggregate.

---

## 7. Class Statistics

Creare eventualmente una dashboard con statistiche della **classe nel suo complesso**.

Esempio:

```text
WDPT14

18 Students
24 Projects
312 Repositories
4,821 Commits
94% Projects Completed
```

Potrebbero esserci anche statistiche come:

```text
Most Used Technologies

JavaScript
React
Node.js
Express
MySQL
```

Questa parte può rendere la homepage più interessante senza mettere direttamente gli studenti in competizione.

---

## 8. Project Completion

Una relazione importante dell'applicazione è:

```text
Students ←→ Projects
```

Uno studente può completare molti progetti.

Un progetto può essere completato da molti studenti.

Questa relazione può contenere informazioni aggiuntive:

```text
student_project

student_id
project_id
repository_url
completed_at
commit_count
```

Questo permette di costruire molte funzionalità interessanti.

Per esempio:

```text
Project → Students who completed it

Student → Projects completed
```

---

## 9. Navigazione incrociata

Uno degli aspetti più interessanti della piattaforma dovrebbe essere la possibilità di navigare tra entità collegate.

Esempio:

```text
React
  ↓
Projects
  ↓
Boolflix
  ↓
Students
  ↓
Emanuele
  ↓
GitHub Repository
```

Oppure:

```text
React
  ↓
Cheat Sheets
  ↓
React Hooks
```

Quindi Topics, Projects, Students, Resources e Cheat Sheets non devono essere sezioni completamente isolate.

Devono essere **collegate tra loro**.

---

## 10. Possibile Recruiter View futura

Dopo aver completato la versione principale dell'applicazione, si potrebbe aggiungere una modalità dedicata ai recruiter.

Per esempio:

```text
Explore Developers
```

con filtri:

```text
Technology
[React]

Projects completed
[10+]

Has final project
[Yes]
```

Risultato:

```text
Developers with React experience

Emanuele
18 React projects
GitHub
View Profile

Francesco
14 React projects
GitHub
View Profile
```

Questa funzionalità deve essere considerata **un'evoluzione futura**, non necessariamente una priorità per la prima versione.

---

## 11. Possibile struttura della navigazione

```text
Home

Projects
Students
Topics
Resources
Cheat Sheets

About
```

In futuro:

```text
Explore Developers
```

---

## 12. Priorità MVP

Per la prima versione concentrarsi su:

1. Students
2. Projects
3. Student ↔ Project relationship
4. Topics
5. Cheat Sheets
6. Resources

Successivamente aggiungere:

1. GitHub integration
2. Class statistics
3. Student statistics
4. Search
5. Filters

Solo successivamente valutare:

1. Recruiter View
2. Advanced GitHub statistics
3. Dashboard avanzata
4. ulteriori funzionalità social/community

---

## 13. Identità del progetto

Il progetto NON deve essere presentato principalmente come:

> Una piattaforma per classificare gli studenti Boolean.

Deve essere presentato come:

> **Una piattaforma full-stack che raccoglie il percorso di una classe Web Development attraverso studenti, progetti, argomenti, risorse e cheat sheet.**

La piattaforma permette agli studenti di continuare a utilizzare il materiale prodotto durante il corso e allo stesso tempo crea uno **showcase del lavoro realizzato dalla classe**.

---

## 14. Principio UX

Quando viene aggiunta una nuova feature, chiedersi:

> Questa feature aiuta uno studente a studiare, ritrovare qualcosa o mostrare il proprio percorso?

Se sì, è coerente con Class14.

Le feature competitive devono invece essere trattate con cautela.

Preferire:

- progress;
- achievements;
- completed projects;
- activity;
- portfolio;
- technologies;
- contributions;
- class statistics;

rispetto a:

- ranking;
- best student;
- worst student;
- winner;
- score basato sui commit.

---

## 15. Direzione finale

Class14 dovrebbe quindi essere pensato come l'unione di:

```text
Learning Platform
        +
Course Archive
        +
Project Gallery
        +
Student Portfolio
        +
Class Showcase
```

La parte **Learning Platform / Course Archive** rappresenta il cuore dell'applicazione.

La parte **Student Portfolio / Class Showcase** aggiunge valore professionale e rende il progetto interessante anche da mostrare durante i colloqui.

In futuro la piattaforma potrebbe evolvere ulteriormente verso:

```text
Class14
├── Learn
│   ├── Topics
│   ├── Resources
│   └── Cheat Sheets
│
├── Build
│   └── Projects
│
└── People
    └── Students
        ├── Projects
        ├── Technologies
        └── GitHub Activity
```

L'obiettivo finale è fare in modo che Class14 racconti **il percorso della classe**, non semplicemente chi ha ottenuto il punteggio più alto.
