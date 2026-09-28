-- Generated from assets/ by node scripts/generate-seed.mjs. Do not edit by hand.
-- Run schema.sql first. Re-running this file updates rows with the same natural key.
use class14;

set names utf8mb4;

set
  @OLD_SQL_MODE = @@SQL_MODE;

set
  sql_mode = 'NO_BACKSLASH_ESCAPES';

start transaction;

insert into
  students (name, github_username, avatar_path)
values
  (
    'Emanuele',
    'emanuelefavero',
    '/avatars/emanuelefavero.jpg'
  ),
  (
    'Francesco',
    'francescoguttuso',
    '/avatars/francescoguttuso.png'
  ),
  (
    'Filippo',
    'FilippoGraziano',
    '/avatars/FilippoGraziano.png'
  ),
  (
    'Eleonora',
    'EleonoraLosciuto',
    '/avatars/EleonoraLosciuto.jpg'
  ),
  ('Dario', 'DarioM1992', '/avatars/DarioM1992.png'),
  (
    'Davide',
    'daviderocco85',
    '/avatars/daviderocco85.png'
  ),
  (
    'Thomas',
    'thomaslazzeri',
    '/avatars/thomaslazzeri.png'
  ),
  ('Chris', 'chrisxwave', '/avatars/chrisxwave.png'),
  ('Guido', 'guidogig', '/avatars/guidogig.jpg'),
  (
    'Jacopo',
    'JacopoAugelli-13',
    '/avatars/JacopoAugelli-13.png'
  ),
  (
    'Francesca',
    'francesca-yui',
    '/avatars/francesca-yui.png'
  ),
  (
    'Oumou',
    'oumouniaonedabre-dot',
    '/avatars/oumouniaonedabre-dot.png'
  ),
  ('Matteo', 'rrope01', '/avatars/rrope01.png'),
  (
    'Vitantonio',
    'VitantonioPasqualicchio',
    '/avatars/VitantonioPasqualicchio.jpg'
  ),
  (
    'Noemi',
    'noemi-tartaglino',
    '/avatars/noemi-tartaglino.png'
  )
on duplicate key update
  name = values(name),
  avatar_path = values(avatar_path);

insert into
  projects (slug, title, description, topics)
values
  (
    'express-blog-sql',
    'Express Blog SQL',
    '# Esercizio: Express Blog SQL

Nome repo: `express-blog-sql`

> Nota: questo esercizio e'' una continuazione del precedente esercizio sulle API del blog: `express-blog-sql`

## Descrizione

Prendiamo l''esercizio precedente da `https://github.com/emanuelefavero/express-blog-sql` su blog API express ed aggiungiamo la persistenza tramite la connessione a un DB

## Milestone 1

Importiamo il db in allegato su MySQL Workbench
Installiamo il client mysql2 con npm i mysql2 nell’app Express
Creiamo un file di configurazione per connettere il database
Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.

## Milestone 2

Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
Verifichiamo su Postman che la risposta sia corretta

## Milestone 3

Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
Verifichiamo su Postman che la chiamata non dia errore e risponda 204
Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso

## Milestone 4

Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
Verifichiamo su Postman che la risposta sia corretta

## Bonus

Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database',
    'mysql2, MySQL, Express'
  ),
  (
    'db-university',
    'DB University',
    '# Esercizio: DB University

Nome repo: `db-university`

## Fase 1

Modellizzare la struttura di un database per memorizzare tutti i dati riguardanti una università:

- sono presenti diversi Dipartimenti (es.: Lettere e Filosofia, Matematica, Ingegneria ecc.);
- ogni Dipartimento offre più Corsi di Laurea (es.: Civiltà e Letterature Classiche, Informatica, Ingegneria Elettronica ecc..)
- ogni Corso di Laurea prevede diversi Corsi (es.: Letteratura Latina, Sistemi Operativi 1, Analisi Matematica 2 ecc.);
- ogni Corso può essere tenuto da diversi Insegnanti;
- ogni Corso prevede più appelli d''Esame;
- ogni Studente è iscritto ad un solo Corso di Laurea;
- ogni Studente può iscriversi a più appelli di Esame;
- per ogni appello d''Esame a cui lo Studente ha partecipato, è necessario memorizzare il voto ottenuto, anche se non sufficiente.

Pensiamo a quali entità (tabelle) creare per il nostro database e cerchiamo poi di stabilirne le relazioni. Infine, andiamo a definire le colonne e i tipi di dato di ogni tabella.

Utilizzare <https://drawsql.app/> per la creazione dello schema.
Esportare quindi il diagramma in jpg e caricarlo nella repo.

## Fase 2

Dopo aver creato un nuovo database nel vostro MySQL Workbench (o altro database client) e aver importato lo schema allegato, eseguite le query del file allegato.

### Queries

1. Selezionare tutti gli studenti nati nel 1990 (160)
2. Selezionare tutti i corsi che valgono più di 10 crediti (479)
3. Selezionare tutti gli studenti che hanno più di 30 anni
4. Selezionare tutti i corsi del primo semestre del primo anno di un qualsiasi corso di laurea (286)
5. Selezionare tutti gli appelli d''esame che avvengono nel pomeriggio (dopo le 14) del 20/06/2020 (21)
6. Selezionare tutti i corsi di laurea magistrale (38)
7. Da quanti dipartimenti è composta l''università? (12)
8. Quanti sono gli insegnanti che non hanno un numero di telefono? (50)

#### Order By queries

1. Contare quanti iscritti ci sono stati ogni anno
2. Contare gli insegnanti che hanno l''ufficio nello stesso edificio
3. Calcolare la media dei voti di ogni appello d''esame
4. Contare quanti corsi di laurea ci sono per ogni dipartimento

> Note: Le queries tra 9 e 12 richiedono l''uso di clausole GROUP BY.

### Cosa consegnare?

Dopo aver testato le vostre query con MySQL Workbench, riportatele in un file txt e caricatelo nella vostra repo.

## Fase 3

### Queries con JOIN

1. Selezionare tutti gli studenti iscritti al Corso di Laurea in Economia
2. Selezionare tutti i Corsi di Laurea Magistrale del Dipartimento di Neuroscienze
3. Selezionare tutti i corsi in cui insegna Fulvio Amato (id=44)
4. Selezionare tutti gli studenti con i dati relativi al corso di laurea a cui sono iscritti e il relativo dipartimento, in ordine alfabetico per cognome e nome
5. Selezionare tutti i corsi di laurea con i relativi corsi e insegnanti
6. Selezionare tutti i docenti che insegnano nel Dipartimento di Matematica (54)
7. BONUS: Selezionare per ogni studente il numero di tentativi sostenuti per ogni esame, stampando anche il voto massimo. Successivamente, filtrare i tentativi con voto minimo 18',
    'MySQL, Database'
  ),
  (
    'db-first',
    'DB First',
    '# Esercizio: DB First

Nome repo: `db-first`

Modellizzare la struttura di una tabella per memorizzare tutti i dati riguardanti delle auto usate messe in vendita da un concessionario.

Se usate DrawSQL, mettete il link o il file esportato nella repo.
Vi allego il lavoro fatto a lezione; sentitevi liberi di provare anche tutti gli altri esempi di tabelle.',
    'Database'
  ),
  (
    'express-blog-api-crud',
    'Express Blog API CRUD (parte 1)',
    '# Esercizio: Express Blog API CRUD (parte 1)

Nome repo: `express-blog-api-crud`

## Fase 1

### Milestone 1 (fase 1)

Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.

All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).

Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.

Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.

Se tutto funziona, passiamo alla prossima milestone

### Milestone 2 (fase 1)

Per iniziare, creiamo una cartella data in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato. Importiamo questo file in cima al controller.

Ora passiamo ad implementare le logiche delle nostre CRUD:

- Index dovrà restituire la lista dei post in formato JSON
- Show dovrà restituire un singolo post in formato JSON
- Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

## Bonus (fase 1)

- Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
- In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.

---

## Fase 2

### Milestone 1 (fase 2)

Per iniziare, andiamo su Postman e prepariamo una nuova chiamata verso la nostra rotta store.

Impostiamo il verbo e l’endpoint corretti
Selezioniamo il tab body e scegliamo il formato raw e JSON
Inseriamo come corpo della nostra request un oggetto che rappresenti un nuovo post

Nota: se vogliamo avere delle immagini, inventiamole pure.

Nota: ricordiamo che non bisogna passare l’id quando si crea una nuova risorsa: sarà il server (con l’aiuto del database) a fornirlo.

### Milestone 2 (fase 2)

Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body.

Poi, all’interno della rotta Store, stampiamo nel terminale i dati in arrivo, grazie a un console.log

### Milestone 3 (fase 2)

Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.

Testiamolo con postman.

### Milestone 4 (fase 2)

Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità di modificare le nostre risorse.

### Bonus (fase 2)

Quelli del giorno prima, se non già fatti
In Update, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.

## Fase 3

Dopo aver completato tutte le operazioni CRUD, completiamo le nostre API inserendo un middleware per la gestione delle rotte non registrate e uno per la gestione degli errori.

- Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.
- Se viene generato un errore, un middleware si occuperà di rispondere con un messaggio e uno status appropriato.',
    'Node.js, Express'
  ),
  (
    'express-blog-routing',
    'Express Blog Routing',
    '# Esercizio: Express Blog Routing

Nome repo: `express-blog-routing`

## Descrizione

Creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l''entità post.

All''interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST.

Ad esempio:

Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;

Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”

e via dicendo…

Registrare il router dentro app.js con il prefisso posts/.

## Nota

Avete anche l’array dei post che vi abbiamo fornito, salvatelo da qualche parte.
Ci servirà per i prossimi step.
Per oggi vi può servire in caso vogliate provare i bonus.

## Bonus

Provare a restituire la lista dei post dalla rotta index, in formato json
Provare a restituire un singolo post dalla rotta show, sempre in formato json',
    'Node.js, Express'
  ),
  (
    'express-blog-intro',
    'Express Blog Intro',
    '# Esercizio: Express Blog Intro

Nome repo: `express-blog-intro`

## Descrizione

Creiamo il nostro blog personale e giorno dopo giorno lo potremo arricchire con nuove funzionalità sulla base di quello che impareremo.

- Creiamo il progetto base con una rotta / che ritorna un testo semplice con scritto ”Server del mio blog”
- Creiamo un array dove inserire una lista di almeno 5 post, per ognuno indicare titolo, contenuto, immagine e tags (tags è un array di stringhe)
- Creiamo poi una rotta /bacheca che restituisca un oggetto json con la lista dei post.
- Configuriamo gli asset statici sull’applicazione in modo che si possano visualizzare le immagini associate ad ogni post.
- Testare su postman',
    'Node.js, Express'
  ),
  (
    'node-hello-world',
    'Node Hello World',
    '# Esercizio: Node Hello World

Node repo: `node-hello-world`

## Esercizio

1. Creiamo la prima applicazione con NodeJs e inizializziamola con npm init
2. Scriviamo un file index.js che dovrà stampare nel terminale “Hello World”. Proviamo ad eseguirlo dal terminale stesso usando i comandi di node base.
3. Impostiamo ora uno script “start” in package.json e facciamo in modo di lanciare il nostro script con npm run start
4. Impostiamo un nuovo script “watch” in package.json che possa essere lanciato con npm run watch e che aggiorni in tempo reale le modifiche ai nostri file. Lanciamolo e proviamo a cambiare il nostro codice in modo che stampi nel terminale “Hello Boolean”.
   Dovremmo vedere il terminale senza fermare e rilanciare il server.',
    'Node.js, NPM'
  ),
  (
    'react-context-api',
    'React Context API',
    '# Esercizio: React Context API

Repo: `react-context-api`

Oggi estendiamo il nostro mini e-commerce introducendo le Context API di React.
Useremo un contesto per gestire una modalità budget, che permette all’utente di visualizzare solo i prodotti più economici.

## MILESTONE 1

Create un nuovo context chiamato BudgetContext

Deve contenere uno stato budgetMode di tipo booleano (true/false)
Deve fornire anche la funzione per modificarlo (setBudgetMode)
Wrappiamo l’intera applicazione con il BudgetProvider

## MILESTONE 2

Create un componente Navbar.jsx (se non lo avete già)

Inseritelo in App.jsx (oppure nel vostro componente di layout se avete organizzato l’app in questo modo)
All’interno della Navbar aggiungete un bottone “Modalità Budget” che attiva/disattiva budgetMode con un click
Il bottone deve cambiare etichetta in base allo stato (Attiva Modalità Budget / Disattiva Modalità Budget)

## MILESTONE 3

Modificate la pagina dei prodotti:

Recuperate il valore budgetMode usando il context
Se budgetMode === true, mostrate solo i prodotti con price <= 30
Altrimenti, mostrare tutti i prodotti normalmente

## BONUS

Trasformare la modalità budget in un vero e proprio filtro:

Trasformate il booleano budgetMode in un valore numerico maxPrice (es.30, 50ecc). Il valore di partenza deve essere null .
Nel componente navbar al posto del bottone inserite un campo input di tipo number. Questo campo deve essere legato al valore maxPrice del context
Nella pagina prodotti, verranno mostrati soltanto i prodotti con price <= maxPrice
‼️Se max price è null o comunque non è settato, devono essere visualizzati tutti i prodotti',
    'React'
  ),
  (
    'react-router',
    'React Router Store',
    '# Esercizio: React Router Store

Repo: `react-router`

## Fase 1: Routing e pagine principali

### Descrizione

Creiamo il frontend del nostro mini e-commerce e le sue pagine principali!
Useremo Fake Store API come backend fittizio per simulare i dati dei prodotti.

- <https://fakestoreapi.com/>

### Obiettivi

Installiamo React Router DOM: npm i react-router-dom
Creiamo almeno 3 pagine principali:

- Homepage (con un messaggio di benvenuto o immagine promozionale)
- Chi siamo
- Prodotti (pagina che mostrerà la lista dei prodotti prendendoli da <https://fakestoreapi.com/products>)

Implementiamo una Navbar visibile in tutte le pagine per navigare tra di esse

### Bonus

Centralizziamo la Navbar usando un componente Layout
Gestiamo la classe active per i link attivi nella Navbar

## Fase 2: Dettaglio prodotto

### Descrizione (fase 2)

Completiamo il nostro routing aggiungendo la pagina di dettaglio prodotto!

### Obiettivi (fase 2)

Nella pagina Prodotti, ogni prodotto deve essere cliccabile (usa `<Link>`)
Aggiungiamo la pagina di dettaglio per ogni prodotto, con le informazioni prese da <https://fakestoreapi.com/products/:id>
Configuriamo il routing dinamico per leggere l’id del prodotto dalla URL

### Bonus (fase 2)

Aggiungiamo una navigazione programmatica che riporti alla pagina di listato se viene cercato un prodotto che non esiste;
Aggiungiamo una pagina 404;
Aggiungiamo un loading per caricamento del dettaglio prodotto.

### Super Bonus (fase 2)

Aggiungiamo nella pagina di dettaglio dei pulsanti per navigare al prodotto precedente o successivo (usando useNavigate() programmaticamente)',
    'React'
  ),
  (
    'react-api',
    'React API',
    '# Esercizio: React API

Repo: `react-api`

## Descrizione

E’ arrivato il momento di mettere insieme i concetti appresi creiamo una piccola app che ci mostri un elenco di attori o attrici.

Usate uno di questi due endpoint, a piacimento:

Lista di Attrici: <https://lanciweb.github.io/demo/api/actresses/>

Lista di Attori: <https://lanciweb.github.io/demo/api/actors/>

## MILESTONE 1

Al caricamento dell''applicazione, recuperiamo la lista degli attori e delle attrici dalle API e stampiamoli in console.

## MILESTONE 2

Prepariamo una card per ciascun attore/attrice, mostrandone le seguenti informazioni:

nome
anno nascita
nazionalità
biografia
immagine
riconoscimenti

## MILESTONE 3

Mostriamo in pagina una card per ciascun attore, con grafica a piacimento!

## BONUS 1 ☺️

Stampare sia una lista delle attrici che degli attori, separatamente.

## BONUS 2 😎

Stampare un’unica lista che contiene attori e attrici insieme!

## BONUS 3 🤯

Aggiungere nella card dell’attore/attrice i film più famosi

🪄

Se questa task è troppo difficile, prova ad aiutarti con l’AI!

Cerca però sempre di comprendere quello che ti viene suggerito',
    'React'
  ),
  (
    'react-movie-filter',
    'React Movie Filter',
    '# Esercizio: React Movie Filter

Repo: `react-movie-filter`

## Descrizione

Create un nuovo progetto React e implementate un sistema di filtro per una lista di film in base al genere.

L''array dei film è già fornito:

```js
[
  { title: ''Inception'', genre: ''Fantascienza'' },
  { title: ''Il Padrino'', genre: ''Thriller'' },
  { title: ''Titanic'', genre: ''Romantico'' },
  { title: ''Batman'', genre: ''Azione'' },
  { title: ''Interstellar'', genre: ''Fantascienza'' },
  { title: ''Pulp Fiction'', genre: ''Thriller'' },
];
```

Dovrete utilizzare lo stato e useEffect per gestire il filtraggio dinamico.

Per oggi diamo priorità alla logica e alla gestione dello stato. Una volta funzionante, possiamo pensare allo stile!

## Note

Il filtro deve funzionare dinamicamente quando l''utente seleziona un genere dalla select.
Se non viene selezionato alcun genere, devono essere mostrati tutti i film.

## BONUS

Aggiungere un campo di ricerca per filtrare i film anche per titolo.
Creare un sistema per aggiungere nuovi film alla lista tramite un form.',
    'React'
  ),
  (
    'react-form',
    'React Blog Form',
    '# Esercizio: React Blog Form

Repo: `react-form`

---

## Fase 1

### Descrizione

#### Milestone 1

Creare una pagina che visualizzi una lista di articoli, mostrandone solo il titolo.

#### Milestone 2

Aggiungiamo in pagina un semplice form con un campo input in cui inserire il titolo di un nuovo articolo del blog. Al submit del form, mostrare la lista degli articoli aggiornati.

### BONUS

Aggiungere la possibilità di cancellare ciascun articolo utilizzando un''icona.
Impostare il lavoro su più componenti.

---

## Fase 2

### Descrizione 2

Continuiamo a estendere il blog in react. Aggiungiamo un form con più campi per creare un nuovo post all’interno di un blog.

I dati che il form dovrà inviare sono i seguenti:

author (string) - L’autore del post
title (string) - Il titolo del post
body (string) - Il testo del post
public (boolean) - Se il post deve essere pubblico (true) o una bozza (false)

### BONUS 2

Per gestire il campo "public" proviamo a usare una checkbox, invece di un input in cui scrivere "true" o "false". possiamo distinguere il campo public verificando il suo .name (o il suo .type) con un if.',
    'React'
  ),
  (
    'react-use-state',
    'React useState',
    '# Esercizio: React useState

Nome repo: `react-use-state`

## Descrizione

Oggi proviamo a usare lo stato di React!

Dato un array di oggetti contenente i linguaggi del web e le loro descrizioni:

Crea una serie di card che mostrano al loro interno un bottone. Il testo del bottone, corrisponde al nome del linguaggio.
Se il bottone viene cliccato, cambia colore e la descrizione diventa visibile all’interno della card.

## Bonus

Crea una lista di bottoni, uno per linguaggio.
Sotto i bottoni, inserisci una singola card. In partenza, questa card mostra il titolo e la descrizione del primo linguaggio nell’array.
Fare in modo che, cliccando uno dei bottoni, la card cambi contenuto e visualizzi il linguaggio corrispondente e la relativa descrizione

## Super Bonus

Scomporre la card dei dettagli in un componente a parte che mantenga le sue funzionalità
Scomporre i buttons in componenti a parte che mantengono tutte le funzionalità',
    'React'
  ),
  (
    'react-dc-comics',
    'React DC Comics',
    '# Esercizio: React DC Comics

Questo progetto e'' suddiviso in piu'' fasi, ognuna delle quali ha una descrizione e un bonus opzionale. Mano a mano che andremo avanti con le lezioni react del corso, saranno aggiunte nuove fasi.

## Fase 1 (dopo lezione "React JSX & Componenti")

nome repo: `react-dc-comics`

### Descrizione 1

Create un nuovo progetto React e definite i componenti necessari per strutturare il layout come da screenshot allegato.
Per oggi diamo priorità alla struttura: quando è tutto bello solido, passiamo al CSS!

### Note 1

Il font utilizzato è Open Sans

### Bonus 1

Creare un componente aggiuntivo per gestire la fascia azzurra con le icone.

---

## Fase 2 (dopo lezione "React: Iterazioni in JSX")

### Descrizione 2

Lavoriamo sul nostro sito dei fumetti per dinamicizzare sia la navbar che i fumetti, sfruttando l’iterazione con JSX.

Per i fumetti, potrete utilizzare i dati in allegato
Per la navbar, vi invitiamo a ragionare su quale possa essere la struttura dati corretta

Una volta inseriti tutti i contenuti dinamicamente, completate il vostro layout e rifinite i dettagli col CSS.

### Bonus 2

Immaginare e creare la struttura dati per i link nel footer e realizzarli tramite l’iterazione!

---

## Fase 3 (dopo lezione "React: Props")

### Descrizione 3

Continuate a lavorare nella stessa repo di ieri e create un nuovo componente riutilizzabile per visualizzare le card dei fumetti, sfruttando l’array di oggetti in allegato. Fate in modo che il componente riceva i dati del singolo fumetto come props.

### Nota 3

Le immagini potrebbero variare leggermente rispetto a quelle nello screenshot.

### Bonus 3

Provare a centralizzare i dati facendoli partire tutti da App.jsx e passandoli via prop ai vari componenti che li necessitano',
    'React'
  ),
  (
    'react-hello-world',
    'React Hello World',
    '# Esercizio: React Hello World

Nome repo: `react-hello-world`

## Descrizione

Create un nuovo progetto React utilizzando Vite: aiutatevi con le slide per ripercorrere i vari passaggi dell''installazione come visti a lezione.

Create una nuova app React e assicuratevi che funzioni avviandola da terminale.

Poi pushate tutto.',
    'React'
  )
on duplicate key update
  title = values(title),
  description = values(description),
  topics = values(topics);

insert into
  cheatsheets (slug, title, file_path)
values
  (
    'database-eleonora',
    'Database Eleonora',
    '/cheatsheets/database-eleonora.pdf'
  ),
  (
    'express-crud',
    'Express CRUD',
    '/cheatsheets/express-crud.pdf'
  ),
  (
    'express-eleonora',
    'Express Eleonora',
    '/cheatsheets/express-eleonora.pdf'
  ),
  (
    'express-rest-api',
    'Express Rest API',
    '/cheatsheets/express-rest-api.pdf'
  ),
  (
    'fetch-axios',
    'Fetch Axios',
    '/cheatsheets/fetch-axios.pdf'
  ),
  (
    'mysql-comandi-base',
    'MySQL Comandi Base',
    '/cheatsheets/mysql-comandi-base.pdf'
  ),
  (
    'mysql-queries',
    'MySQL Queries',
    '/cheatsheets/mysql-queries.pdf'
  ),
  (
    'node-express-sintesi',
    'Node Express Sintesi',
    '/cheatsheets/node-express-sintesi.pdf'
  ),
  (
    'node-npm-eleonora',
    'Node NPM Eleonora',
    '/cheatsheets/node-npm-eleonora.pdf'
  ),
  (
    'node-npm-vite',
    'Node NPM Vite',
    '/cheatsheets/node-npm-vite.pdf'
  ),
  (
    'node-npm',
    'Node NPM',
    '/cheatsheets/node-npm.pdf'
  ),
  (
    'node-vite',
    'Node Vite',
    '/cheatsheets/node-vite.pdf'
  ),
  (
    'react-classname',
    'React Classname',
    '/cheatsheets/react-classname.pdf'
  ),
  (
    'react-fetch',
    'React Fetch',
    '/cheatsheets/react-fetch.pdf'
  ),
  (
    'react-props',
    'React Props',
    '/cheatsheets/react-props.pdf'
  ),
  (
    'react-router',
    'React Router',
    '/cheatsheets/react-router.pdf'
  ),
  (
    'react-use-effect',
    'React Use Effect',
    '/cheatsheets/react-use-effect.pdf'
  ),
  (
    'react-use-state',
    'React Use State',
    '/cheatsheets/react-use-state.pdf'
  )
on duplicate key update
  title = values(title),
  file_path = values(file_path);

insert into
  resources (title, url)
values
  (
    'mysql2 Documentation',
    'https://sidorares.github.io/node-mysql2/docs'
  ),
  (
    'MySQL Documentation',
    'https://dev.mysql.com/doc/'
  ),
  (
    'MySQL Tutorial',
    'https://www.w3schools.com/MYSQL/default.asp'
  ),
  (
    'MySQL Workbench download',
    'https://dev.mysql.com/downloads/workbench/'
  ),
  (
    'MySQL Community server download',
    'https://dev.mysql.com/downloads/mysql/'
  ),
  ('Database DrawSQL', 'https://drawsql.app/'),
  (
    'Express Documentation',
    'https://expressjs.com/en/5x/starter/installing/'
  ),
  (
    'Express Tutorial',
    'https://www.w3schools.com/nodejs/nodejs_express.asp'
  ),
  ('Express REST', 'https://restfulapi.net/'),
  (
    'Express HTTP',
    'https://developer.mozilla.org/en-US/docs/Web/HTTP'
  ),
  (
    'Node.js Documentation',
    'https://nodejs.org/en/docs/'
  ),
  (
    'Node.js Tutorial',
    'https://www.w3schools.com/nodejs/default.asp'
  ),
  (
    'NPM Documentation',
    'https://docs.npmjs.com/about-npm'
  ),
  (
    'NPM Tutorial',
    'https://www.w3schools.com/nodejs/nodejs_npm.asp'
  ),
  (
    'React Documentation',
    'https://reactjs.org/docs/getting-started.html'
  ),
  (
    'React Tutorial',
    'https://www.w3schools.com/react/'
  ),
  ('React Router', 'https://reactrouter.com/')
on duplicate key update
  title = values(title);

-- Only verified, exact public repository URLs are included.
insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/express-blog-sql'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'express-blog-sql'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/db-university'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/db-first'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-context-api'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-context-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-router'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-api'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-form'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/emanuelefavero/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'emanuelefavero'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/express-blog-sql'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'express-blog-sql'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/db-university'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/db-first'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-context-api'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-context-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-router'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-api'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-form'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francescoguttuso/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'francescoguttuso'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/express-blog-sql'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'express-blog-sql'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/db-university'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/db-first'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-context-api'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-context-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-router'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-api'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-form'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/FilippoGraziano/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'FilippoGraziano'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/db-university'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-router'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-api'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-form'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/EleonoraLosciuto/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'EleonoraLosciuto'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/db-first'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/react-router'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/react-api'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/react-form'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/DarioM1992/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'DarioM1992'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/express-blog-sql'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'express-blog-sql'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/db-university'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/db-first'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-context-api'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-context-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-router'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-api'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-form'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/daviderocco85/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'daviderocco85'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/db-university'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/db-first'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-context-api'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-context-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-router'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-api'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-form'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/thomaslazzeri/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'thomaslazzeri'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/chrisxwave/react-form'
from
  students
  cross join projects
where
  students.github_username = 'chrisxwave'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/chrisxwave/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'chrisxwave'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/chrisxwave/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'chrisxwave'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/db-university'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/db-first'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/guidogig/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'guidogig'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/db-university'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'db-university'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/db-first'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'db-first'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/express-blog-api-crud'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'express-blog-api-crud'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-context-api'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-context-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-router'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-router'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-api'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-api'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-movie-filter'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-movie-filter'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-form'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-form'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/JacopoAugelli-13/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'JacopoAugelli-13'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francesca-yui/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'francesca-yui'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/francesca-yui/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'francesca-yui'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/oumouniaonedabre-dot/express-blog-routing'
from
  students
  cross join projects
where
  students.github_username = 'oumouniaonedabre-dot'
  and projects.slug = 'express-blog-routing'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/oumouniaonedabre-dot/express-blog-intro'
from
  students
  cross join projects
where
  students.github_username = 'oumouniaonedabre-dot'
  and projects.slug = 'express-blog-intro'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/oumouniaonedabre-dot/node-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'oumouniaonedabre-dot'
  and projects.slug = 'node-hello-world'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/oumouniaonedabre-dot/react-use-state'
from
  students
  cross join projects
where
  students.github_username = 'oumouniaonedabre-dot'
  and projects.slug = 'react-use-state'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/oumouniaonedabre-dot/react-dc-comics'
from
  students
  cross join projects
where
  students.github_username = 'oumouniaonedabre-dot'
  and projects.slug = 'react-dc-comics'
on duplicate key update
  repo_url = values(repo_url);

insert into
  student_projects (student_id, project_id, repo_url)
select
  students.id,
  projects.id,
  'https://github.com/oumouniaonedabre-dot/react-hello-world'
from
  students
  cross join projects
where
  students.github_username = 'oumouniaonedabre-dot'
  and projects.slug = 'react-hello-world'
on duplicate key update
  repo_url = values(repo_url);

-- Curated project-to-PDF links; also available separately in project-cheatsheets.sql.
insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-sql'
  and cheatsheets.slug = 'database-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-sql'
  and cheatsheets.slug = 'mysql-comandi-base';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-sql'
  and cheatsheets.slug = 'mysql-queries';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-sql'
  and cheatsheets.slug = 'node-express-sintesi';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-sql'
  and cheatsheets.slug = 'express-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-sql'
  and cheatsheets.slug = 'express-crud';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'db-university'
  and cheatsheets.slug = 'database-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'db-university'
  and cheatsheets.slug = 'mysql-comandi-base';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'db-university'
  and cheatsheets.slug = 'mysql-queries';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'db-first'
  and cheatsheets.slug = 'database-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-api-crud'
  and cheatsheets.slug = 'express-crud';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-api-crud'
  and cheatsheets.slug = 'express-rest-api';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-api-crud'
  and cheatsheets.slug = 'express-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-routing'
  and cheatsheets.slug = 'express-rest-api';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-routing'
  and cheatsheets.slug = 'express-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-intro'
  and cheatsheets.slug = 'node-express-sintesi';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'express-blog-intro'
  and cheatsheets.slug = 'express-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'node-hello-world'
  and cheatsheets.slug = 'node-npm';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'node-hello-world'
  and cheatsheets.slug = 'node-npm-eleonora';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-context-api'
  and cheatsheets.slug = 'react-props';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-context-api'
  and cheatsheets.slug = 'react-use-state';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-context-api'
  and cheatsheets.slug = 'react-use-effect';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-context-api'
  and cheatsheets.slug = 'react-fetch';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-router'
  and cheatsheets.slug = 'react-router';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-router'
  and cheatsheets.slug = 'react-fetch';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-router'
  and cheatsheets.slug = 'fetch-axios';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-api'
  and cheatsheets.slug = 'react-fetch';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-api'
  and cheatsheets.slug = 'fetch-axios';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-api'
  and cheatsheets.slug = 'react-use-effect';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-movie-filter'
  and cheatsheets.slug = 'react-use-state';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-movie-filter'
  and cheatsheets.slug = 'react-use-effect';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-form'
  and cheatsheets.slug = 'react-use-state';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-form'
  and cheatsheets.slug = 'react-props';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-use-state'
  and cheatsheets.slug = 'react-use-state';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-dc-comics'
  and cheatsheets.slug = 'react-props';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-dc-comics'
  and cheatsheets.slug = 'react-classname';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-hello-world'
  and cheatsheets.slug = 'node-vite';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-hello-world'
  and cheatsheets.slug = 'node-npm-vite';

insert ignore into
  project_cheatsheets (project_id, cheatsheet_id)
select
  projects.id,
  cheatsheets.id
from
  projects
  cross join cheatsheets
where
  projects.slug = 'react-hello-world'
  and cheatsheets.slug = 'react-classname';

-- Topic-based project-to-resource links; also available separately in project-resources.sql.
insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://sidorares.github.io/node-mysql2/docs';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://dev.mysql.com/doc/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://www.w3schools.com/MYSQL/default.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://dev.mysql.com/downloads/workbench/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://dev.mysql.com/downloads/mysql/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://expressjs.com/en/5x/starter/installing/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://restfulapi.net/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-sql'
  and resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'db-university'
  and resources.url = 'https://dev.mysql.com/doc/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'db-university'
  and resources.url = 'https://www.w3schools.com/MYSQL/default.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'db-university'
  and resources.url = 'https://dev.mysql.com/downloads/workbench/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'db-university'
  and resources.url = 'https://dev.mysql.com/downloads/mysql/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'db-university'
  and resources.url = 'https://drawsql.app/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'db-first'
  and resources.url = 'https://drawsql.app/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-api-crud'
  and resources.url = 'https://expressjs.com/en/5x/starter/installing/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-api-crud'
  and resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-api-crud'
  and resources.url = 'https://restfulapi.net/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-api-crud'
  and resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-api-crud'
  and resources.url = 'https://nodejs.org/en/docs/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-api-crud'
  and resources.url = 'https://www.w3schools.com/nodejs/default.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-routing'
  and resources.url = 'https://expressjs.com/en/5x/starter/installing/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-routing'
  and resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-routing'
  and resources.url = 'https://restfulapi.net/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-routing'
  and resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-routing'
  and resources.url = 'https://nodejs.org/en/docs/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-routing'
  and resources.url = 'https://www.w3schools.com/nodejs/default.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-intro'
  and resources.url = 'https://expressjs.com/en/5x/starter/installing/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-intro'
  and resources.url = 'https://www.w3schools.com/nodejs/nodejs_express.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-intro'
  and resources.url = 'https://restfulapi.net/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-intro'
  and resources.url = 'https://developer.mozilla.org/en-US/docs/Web/HTTP';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-intro'
  and resources.url = 'https://nodejs.org/en/docs/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'express-blog-intro'
  and resources.url = 'https://www.w3schools.com/nodejs/default.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'node-hello-world'
  and resources.url = 'https://nodejs.org/en/docs/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'node-hello-world'
  and resources.url = 'https://www.w3schools.com/nodejs/default.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'node-hello-world'
  and resources.url = 'https://docs.npmjs.com/about-npm';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'node-hello-world'
  and resources.url = 'https://www.w3schools.com/nodejs/nodejs_npm.asp';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-context-api'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-context-api'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-router'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-router'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-router'
  and resources.url = 'https://reactrouter.com/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-api'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-api'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-movie-filter'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-movie-filter'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-form'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-form'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-use-state'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-use-state'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-dc-comics'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-dc-comics'
  and resources.url = 'https://www.w3schools.com/react/';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-hello-world'
  and resources.url = 'https://reactjs.org/docs/getting-started.html';

insert ignore into
  project_resources (project_id, resource_id)
select
  projects.id,
  resources.id
from
  projects
  cross join resources
where
  projects.slug = 'react-hello-world'
  and resources.url = 'https://www.w3schools.com/react/';

commit;

set
  sql_mode = @OLD_SQL_MODE;
