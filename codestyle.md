# Class14 — stile di codice e struttura

Questo documento guida il codice di Class14. I riferimenti sono i progetti locali `express-blog-sql` e `react-context-api`; quando si riutilizza codice, adattarlo alle esigenze di Class14 senza copiare parti non necessarie. Il progetto usa JavaScript, moduli ES e codice semplice da spiegare durante il corso. Per ora non aggiungere JSDoc.

## Principi comuni

- Preferire la soluzione corretta più semplice. Ogni file e funzione deve avere una responsabilità chiara; introdurre astrazioni solo quando risolvono un problema già presente.
- Usare `const` per default, `let` solo per riassegnazioni e mai `var`. Dare nomi descrittivi a funzioni, variabili e componenti.
- Usare export nominati, import diretti e `.js` negli import relativi del backend. I componenti React sono in file `.jsx`.
- Gestire subito input non validi, dati assenti ed errori con guard clause e ritorni anticipati. Evitare `else` dopo un `return`.
- Usare `map`, `filter`, `find` e gli altri metodi degli array quando rendono l'operazione più chiara; un ciclo esplicito va bene quando il flusso è più leggibile.
- Tenere commenti brevi per spiegare decisioni non evidenti. Evitare commenti che ripetono il codice e documentazione JSDoc sistematica.
- Mantenere la formattazione dei progetti di riferimento: indentazione di 2 spazi, apici singoli, punto e virgola, trailing comma dove applicabile. Configurare Prettier separatamente per backend e frontend solo quando verranno creati.
- Nessun token o segreto nel codice, nel frontend o nel repository. Le variabili d'ambiente restano sul server; `.env` è ignorato da Git.

## Struttura prevista

```text
webapp-express/                 # nome della cartella e della repository invariato
├── assets/                     # dati sorgente, avatar, descrizioni e PDF già raccolti
├── scripts/                    # script di preparazione e sincronizzazione dati
├── server/
│   ├── app.js                  # configurazione Express e avvio
│   ├── db/                     # pool mysql2 e script SQL/seed
│   ├── middleware/             # 404 ed error handler, poi solo middleware condivisi utili
│   ├── resources/
│   │   ├── students/           # routes, controller, repository, schemas se servono
│   │   ├── projects/
│   │   └── cheatsheets/
│   └── public/                 # file serviti da Express, preparati dagli assets
└── client/
    ├── index.html
    └── src/
        ├── main.jsx           # BrowserRouter e mount React
        ├── App.jsx            # Routes e Route
        ├── pages/             # componenti delle pagine collegate agli URL
        ├── layouts/           # RootLayout con Outlet
        ├── components/
        │   ├── layout/         # Header, Main, Footer
        │   ├── ui/             # elementi visivi riutilizzabili
        │   └── shared/         # componenti riutilizzati ma specifici di Class14
        ├── features/           # solo per funzionalità con più file dedicati
        ├── lib/                # client API e piccole utilità condivise
        └── index.css          # token, reset e stili globali
```

La struttura è un riferimento per quando inizierà l'applicazione: creare le cartelle man mano che servono. Il nome visibile nell'interfaccia è **Class14**; non rinominare `webapp-express`.

## Backend Express

- Usare Node.js con ES Modules, Express e `mysql2/promise`, come in `express-blog-sql`. La connessione MySQL usa un pool in `server/db/`; credenziali, porta e nome del database arrivano dalle variabili d'ambiente.
- Raggruppare per risorsa. Le routes associano URL e metodi HTTP ai controller; i controller leggono e validano la richiesta, chiamano il repository e costruiscono la risposta; i repository eseguono query e restituiscono dati senza conoscere Express o gli status HTTP.
- Tenere le query SQL parametrizzate. Per i filtri, consentire in `ORDER BY` soltanto colonne e direzioni esplicitamente ammesse: i placeholder proteggono i valori, non i nomi delle colonne.
- Validare `params`, `query` e `body` al confine HTTP. Usare controlli diretti per casi semplici e Zod quando schema, coercizione o messaggi di errore lo rendono più chiaro. Non rivalidare gli stessi dati in ogni livello.
- Rispondere in JSON per le API. Distinguere input non valido (`400`), risorsa assente (`404`) ed errore interno (`500`). Centralizzare middleware per rotte inesistenti ed errori; non esporre dettagli interni nelle risposte `500`.
- Aggiungere un service solo quando coordina regole reali tra più repository o operazioni. Non creare wrapper che inoltrano semplicemente una chiamata.
- Esporre avatar e PDF come file statici da `server/public/` quando si implementa il backend. `assets/` resta la sorgente dei file e dei dati per il seed; evitare percorsi locali assoluti nelle API.

## Frontend React e routing

- Usare React con Vite e JavaScript. I componenti sono funzioni con export nominato; tenere stato e logica nel componente più vicino a chi li usa. Derivare i valori calcolabili invece di duplicarli nello stato.
- Usare **React Router Declarative Mode**: `BrowserRouter` in `main.jsx`, `Routes` e `Route` in `App.jsx`, pagine in `src/pages/`. `RootLayout` contiene `Header`, `Main`, `Footer` e rende le pagine figlie con `Outlet`. Per la navigazione usare `Link` o `NavLink`, non ricaricamenti manuali della pagina.
- La forma delle route è questa (i nomi delle pagine sono esempi):

  ```jsx
  <BrowserRouter>
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='projects/:slug' element={<Project />} />
      </Route>
    </Routes>
  </BrowserRouter>
  ```

- Non trasferire `createBrowserRouter` e `RouterProvider` da `react-context-api`: quel progetto usa la Data Mode. In Class14 le richieste API vivono in funzioni dedicate in `src/lib/` o nella feature pertinente; le pagine gestiscono caricamento, errore, lista vuota e dati disponibili.
- `components/layout` contiene la struttura visiva dell'app. `components/ui` contiene elementi generici come Button, Card, Badge, Input, Select e Spinner. `components/shared` contiene elementi riutilizzati che conoscono Class14 o il suo routing, come un eventuale BackButton. `pages` compone questi componenti per ciascun URL.
- I componenti UI di `react-context-api` sono il punto di partenza, non una dipendenza da copiare integralmente. Portare solo quelli usati; adattare import, `cx`, icone, varianti e CSS senza rompere l'accessibilità. Rating e IncrementalList si aggiungono solo se una funzionalità li richiede.
- Usare Context soltanto per stato realmente condiviso da rami distanti dell'albero. Preferire props e composizione per il resto. Limitare `useEffect` alla sincronizzazione con sistemi esterni, come le richieste API.

## CSS e interfaccia

- Usare CSS nativo con custom properties per colori, spaziatura e altri valori condivisi, CSS nesting per lo scope dei componenti e file CSS vicini ai relativi componenti o pagine.
- `index.css` contiene token, reset, tipografia e poche utility generali; gli stili specifici restano accanto ai componenti. Non introdurre Bootstrap o un framework CSS.
- Prevedere layout responsive, HTML semantico, etichette per i controlli, focus visibile e testo alternativo per le immagini. Usare `prefers-color-scheme` per il tema chiaro/scuro automatico previsto dal progetto.
- Mantenere il branding **Class14** coerente in header, titoli e metadati visibili. I contenuti tecnici e i nomi delle cartelle possono restare in inglese; i testi dell'interfaccia vanno mantenuti coerenti nella lingua scelta per l'app.

## Prima di considerare conclusa una feature

- Controllare il percorso normale e i casi di dati assenti, input non valido ed errore di rete/database pertinenti alla feature.
- Verificare il comportamento delle pagine su desktop e mobile e usare gli script di lint/build quando il progetto li avrà.
- Aggiornare `KANBAN.md` e la documentazione dei dati/API quando cambia il comportamento, senza aggiungere cartelle o livelli architetturali per ipotesi future.
