# Esercizio: React Router Store

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

Aggiungiamo nella pagina di dettaglio dei pulsanti per navigare al prodotto precedente o successivo (usando useNavigate() programmaticamente)
