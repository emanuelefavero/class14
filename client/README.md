# Class14 client

Frontend React/Vite del Learning Hub WDPT14. Permette di esplorare argomenti,
progetti, studenti, cheat sheet e risorse della classe.

La direzione UI e UX è descritta in [DESIGN.md](../docs/DESIGN.md), mentre le
risposte attese dal backend sono definite in
[API-CONTRACT.md](../docs/API-CONTRACT.md).

## Funzionalità principali

- Home editoriale con i contatori generali del catalogo.
- Liste e dettagli collegati di argomenti, progetti e studenti.
- Cataloghi autonomi di cheat sheet e risorse.
- Ricerca e filtro per argomento nelle liste di progetti, studenti, cheat sheet
  e risorse.
- Descrizioni dei progetti renderizzate da Markdown senza HTML non attendibile.
- Stati di caricamento, errore, contenuto assente e nessun risultato.
- Tema automatico chiaro/scuro e layout responsive.

## Struttura

```text
src/
├── components/
│   ├── layout/       Header, Main e Footer
│   ├── shared/       componenti condivisi tra le pagine del catalogo
│   └── ui/           componenti di base come Button, Card, Input e Select
├── features/
│   ├── catalog/      hook di fetching, filtri e schemi Zod del catalogo
│   └── stats/        hook e schema Zod dei contatori della Home
├── lib/              utilità comuni e configurazione delle richieste Axios
├── pages/            pagine lista, dettaglio, Home e Not Found
├── router/           percorsi e link di navigazione
├── App.jsx           definizione delle route React Router
└── RootLayout.jsx    layout comune che contiene Header, Main e Footer
```

`App.jsx` usa React Router in Declarative Mode. Le pagine vengono renderizzate
dentro l'`Outlet` di `RootLayout`, così la struttura generale rimane condivisa.

## Flusso dei dati

Ogni pagina usa un hook esplicito per la risorsa che deve caricare, ad esempio
`useProjects`, `useProject`, `useStudents` o `useTopics`.

```text
Pagina → hook della risorsa → fetchData (Axios) → API Express
                                      ↓
                              validazione Zod
                                      ↓
                         stato idle/loading/success/error
```

Gli hook conservano lo stato della richiesta. La pagina decide poi se mostrare
`CatalogState`, un messaggio senza risultati oppure i dati ricevuti. Gli hook di
dettaglio ricevono dalla pagina lo slug, lo username o il nome del topic letto
dai parametri della route.

## Flusso dei filtri

`CatalogFilters` mostra la ricerca, la select degli argomenti, il conteggio dei
risultati e il pulsante di reset. Non esegue direttamente il fetching.

`useCatalogFilters` legge `q` e `topic` dai search parameter dell'URL e restituisce
`search`, `topic` e `updateFilters`. Quando l'utente applica un filtro:

```text
CatalogFilters → updateFilters(search, topic) → URL aggiornata
       → nuovo render → hook della risorsa → nuova richiesta API
```

Per esempio, `/projects?q=react&topic=Express` produce una richiesta a
`/api/projects` con gli stessi parametri. In questo modo i filtri sopravvivono al
reload, funzionano con la cronologia del browser e possono essere condivisi.

Dentro `CatalogFilters`, `draft` contiene temporaneamente il testo digitato. Il
valore viene applicato all'URL solo al submit, evitando una richiesta per ogni
carattere inserito.

## Avvio e controlli

Seguire [SETUP.md](../docs/SETUP.md) dalla root del repository. Durante lo
sviluppo Vite inoltra `/api`, `/avatars` e i file sotto `/cheatsheets/` al server
Express; il client usa quindi URL relativi.

Dal percorso `client/` sono disponibili:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

L'MVP locale è completo. Deployment e pubblicazione della repository saranno
decisi dopo il confronto con l'insegnante.
