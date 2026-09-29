# Class14 — Kanban

Procedere nell’ordine indicato, una fase verificabile alla volta: **prima backend, poi frontend**. Spostare in **In corso** l’attività avviata e in **Fatto** quella verificata. Server e client conservano cartelle e package separati.

## Direzione e perimetro confermati

- [PLAN.md](PLAN.md) descrive la nuova direzione: **Learning Hub** come identità principale, con **Student Showcase** integrato e senza classifiche competitive. [AGENTS.md](AGENTS.md) precisa il perimetro approvato e i limiti dei dati; [DESIGN.md](DESIGN.md) guida design e UX frontend.
- **MVP senza modifiche allo schema `class14`**: Projects, Students, Cheat Sheets, Resources, Topics, Home con contatori, ricerca e filtri essenziali dopo le liste.
- Mantenere i 15 progetti da React in poi. Non ampliare il catalogo con gli esempi o i numeri illustrativi del piano.
- La presenza di una repository pubblica non certifica il completamento: usare “Repository disponibili”. `created_at` rappresenta l’inserimento, non una data didattica o di completamento.
- Topics derivati da `projects.topics`; materiali associati indirettamente attraverso i progetti e deduplicati. Presentarli come “Materiali dei progetti collegati”.
- La navigazione MVP privilegia **Argomenti, Progetti e Studenti** nell'header. Home è raggiungibile dal brand; Cheat sheet e Risorse mantengono cataloghi completi, con accessi da Home, footer e pagine correlate. Liste e dettagli devono collegare le entità, secondo [DESIGN.md](DESIGN.md).

## Base attuale e metodo di conversione

- `server/` deriva da `express-blog-sql`; `client/` da `react-context-api`. Non ricreare lo scaffolding.
- Dipendenze, script comuni e avvio sono documentati in [docs/SETUP.md](docs/SETUP.md). I package `class14`, `class14-server` e `class14-client` e i contenuti principali delle app sono adattati a Class14.
- Posts e Products sono stati sostituiti dalle feature Class14. I loro import, route, provider e richieste non fanno più parte dell'app.
- Usare React Router Declarative Mode; Zod ai confini HTTP di frontend e backend. JavaScript, nessun typecheck TypeScript né nuovo JSDoc per typing.
- Il database è già inizializzato. Preservare `server/db/setup/`: non cancellare, ricreare o reimportare i dati per avviare l’MVP. Leggere solo i file pertinenti quando necessario.

## Da fare

### 1. Contratto API MVP — completato

- [x] Creare il documento del contratto API in `docs/`, confrontando ogni campo con lo schema corrente.
- [x] Definire endpoint e identificatori per lista/dettaglio progetti e studenti.
- [x] Definire accesso ai cataloghi autonomi Cheat Sheets e Resources, includendo i progetti collegati.
- [x] Definire elenco/dettaglio dei topics derivati e deduplicazione dei materiali indiretti.
- [x] Definire come fornire i contatori Home: studenti, progetti, repository del catalogo, PDF e risorse.
- [x] Definire JSON, nomi dei campi, topics come array in risposta, URL GitHub/statici, collezioni vuote e risorse assenti.
- [x] Definire errori 400/404/500, ordinamento e ricerca/filtri essenziali; decidere se occorre paginazione per il catalogo attuale.
- [x] Documentare che repository, topics del profilo e date di inserimento non provano completamento o competenze certificate.

Specifica: [docs/API-CONTRACT.md](docs/API-CONTRACT.md). Contratto definito rispetto a schema/generatore; gli endpoint sono stati implementati nelle fasi 3–6.

### 2. Configurazione e adattamento backend — completato

- [x] Completare branding dei contenuti iniziali dell’API e documentazione server.
- [x] Riallineare README e riferimenti alle linee guida copiati dal blog.
- [x] Completare configurazione ambiente del pool MySQL e `server/.env.example`, senza credenziali fisse né segreti.
- [x] Verificare configurazione personalizzata e gestione del fallimento della connessione; l’avvio con MySQL disponibile è già verificato.

Verificati configurazione personalizzata, root Class14, configurazione non valida, connessione rifiutata e porta HTTP occupata; dettagli in `server/README.md`. Nessuna modifica ai dati.

### 3. API Projects — completato

- [x] Creare routes, controller e repository secondo lo stile server esistente.
- [x] Implementare lista con titolo, slug e topics.
- [x] Implementare dettaglio con descrizione Markdown, studenti/repository, PDF e risorse.
- [x] Verificare lista, dettaglio inesistente, relazioni e assenza di duplicati.
- [x] Dopo la verifica, rimuovere `server/resources/posts/` e registrazione; sostituire le richieste posts in `server/test.http`.

Verifica HTTP e confronto di tutte le relazioni con query DB di sola lettura: 15 progetti, 124 repository, 39 PDF e 54 risorse associate. Verificati ordinamento, filtri, ricerca letterale, 400/404 e rimozione /posts.

### 4. API Students — completato

- [x] Implementare lista con nome, username, link GitHub e avatar.
- [x] Implementare profilo con repository pubbliche dei progetti del catalogo.
- [x] Se previsto dal contratto, derivare numero di repository e topics dei progetti associati.
- [x] Verificare studente inesistente, studente senza repository e conteggi coerenti.
- [x] Aggiungere richieste ripetibili in `server/test.http`.

### 5. API Cheat Sheets e Resources — completato

- [x] Implementare i cataloghi autonomi: PDF con titolo/slug/percorso e risorse con titolo/URL.
- [x] Restituire i progetti collegati secondo il contratto, senza duplicati.
- [x] Verificare le relazioni in entrambe le direzioni e aggiungere richieste in `server/test.http`.
- [x] Non inventare descrizioni PDF, categorie risorse o date di pubblicazione dai campi disponibili.

Verificati tutti i profili e cataloghi con query DB di sola lettura, conteggi/ordinamento, relazioni inverse, filtri q/topic e 400/404. Tre studenti senza repository verificati sui dati reali; materiali senza progetti verificati con fixture isolate.

### 6. Topics e contatori Home — completato

- [x] Estrarre i tag dai progetti, rimuovere spazi esterni e duplicati; confrontare tag interi.
- [x] Implementare elenco topics e accesso ai rispettivi progetti.
- [x] Se previsto dal contratto, aggregare PDF/risorse via progetti, deduplicati per ID e dichiarati come collegamenti indiretti.
- [x] Implementare conteggi delle cinque entità del catalogo, senza percentuali di completamento.
- [x] Verificare topic inesistente, deduplicazione e conteggi; aggiungere richieste in `server/test.http`.

### 7. Statici, errori e verifica backend — completato

- [x] Preparare avatar e PDF in `server/public/`, rispettando i percorsi salvati nel DB.
- [x] Verificare apertura avatar/PDF e comportamento di file inesistenti.
- [x] Validare input HTTP e verificare 400/404/500 senza dettagli interni.
- [x] Confrontare i flussi API con il contratto e completare `server/test.http`.
- [x] Verificare che non rimangano route/query/documentazione attiva del blog.
- [x] Definire proxy Vite o CORS per collegare React all’API.

### 8. Adattamento frontend — completato

- [x] Preparare il boilerplate Products come esempio Zod: schemi di risposta in `schemas.js`, parsing dopo le fetch, rimozione del validatore manuale e del file JSDoc dei tipi non utilizzato.
- [x] Passare a React Router Declarative Mode e collocare `RootLayout` in `client/src/`, mantenendo `Outlet` e le route esistenti.
- [x] Definire la lingua: interfaccia frontend in italiano; codice, API, percorsi, slug e nomi originali di progetti e tecnologie in inglese. Valutare una versione inglese dopo la verifica dell'MVP, senza introdurre ora un sistema multilingua.
- [x] Definire in `DESIGN.md` direzione visiva, navigazione e flussi fra Home, Topics, Projects, Students, Cheat Sheets e Resources.
- [x] Adattare titolo HTML, metadati, favicon, Header, Footer e documentazione client a Class14; nomi package già aggiornati.
- [x] Preparare le sei destinazioni Class14 con pagine introduttive, conservando RootLayout con Header/Main/Outlet/Footer. Products resta temporaneamente accessibile solo tramite URL diretto.
- [x] Riutilizzare CSS nativo, token e tema automatico; verificare Home desktop e menu/navigazione su viewport iPhone 16.
- [x] Usare Axios e uno schema Zod vicino alla feature per la richiesta Class14 `/api/stats`, senza validatori o tipi duplicati.

Al termine della fase 8, build e lint client riusciti; la Home mostrava lo stato di indisponibilità dei contatori quando l'API non era raggiungibile. La risposta riuscita e i cataloghi sono stati verificati nella fase 9.

La fase 8 aveva introdotto l'header a tre voci e pagine introduttive. Le pagine introduttive sono state sostituite nella fase 9; Cheat sheet e Risorse sono raggiungibili dalla Home, dal footer e tramite URL diretto.

### 9. Pagine MVP — completato un flusso alla volta

- [x] Collegare lista/dettaglio Projects: Markdown sicuro, tag verso Argomenti, studenti con repository disponibili e link ai profili, PDF e risorse. Il dettaglio è il nodo principale delle relazioni.
- [x] Sostituire Products dopo il flusso Projects e rimuovere provider/import/route/controlli pertinenti.
- [x] Creare elenco/dettaglio Topics: da ciascun argomento aprire i progetti associati e i PDF/risorse ricavati da quei progetti, deduplicati e presentati come “Materiali dei progetti collegati”.
- [x] Portare l'header a tre voci principali (Argomenti, Progetti, Studenti), mantenendo Home dal logo e i link a Cheat sheet e Risorse dalla Home.
- [x] Aggiungere link a Cheat sheet e Risorse nel footer e i collegamenti contestuali nelle pagine di dettaglio.
- [x] Collegare lista/profilo Students con avatar, GitHub, progetti e repository disponibili; dai progetti aprire i profili e viceversa.
- [x] Creare il catalogo Cheat sheet con apertura/download PDF e link ai progetti collegati; mantenere `/cheatsheets` raggiungibile direttamente.
- [x] Creare il catalogo Risorse con link esterni e link ai progetti collegati; mantenere `/resources` raggiungibile direttamente.
- [x] Completare e verificare la Home con contatori reali e contenuti collegati alle pagine MVP; struttura e richiesta `/api/stats` sono già presenti.
- [x] Gestire caricamento, errori, dati assenti e 404 nei flussi pertinenti.
- [x] Verificare almeno il percorso Argomento → Progetto → Studente → Repository e il ritorno ai materiali/progetti; nessuna lista deve restare isolata.
- [x] Rimuovere gli ultimi contenuti Products e le dipendenze dalla Fake Store API.

Verificati nel browser Home con contatori reali, le tre liste principali, il percorso React → React Hello World → Emanuele con repository, uno studente senza repository, 404 progetto e accessi diretti ai cataloghi materiali. PDF e avatar restituiscono i Content-Type corretti attraverso Vite. Build, lint e formattazione client verificati; ricerca e filtri restano nella fase 10.

### 10. Ricerca e filtri essenziali — completato

- [x] Implementare la ricerca concordata su titoli, nomi e username e il filtro topic nelle quattro liste supportate dall'API.
- [x] Usare `q` e `topic` nei parametri URL e nelle richieste API, senza nuovi campi o endpoint.
- [x] Verificare combinazioni di filtri, reset e nessun risultato.

Controllate via HTTP attraverso Vite le quattro liste senza parametri, con `q` e `topic` combinati e senza risultati. Build, lint e formattazione client passati.

### 11. Rifinitura e consegna — completato per l'MVP locale

- [x] Verificare navigazione incrociata, link esterni, avatar, PDF e accesso diretto alle pagine di dettaglio.
- [x] Verificare mobile, tastiera, focus, etichette e tema chiaro/scuro.
- [x] Eseguire lint/build e controlli HTTP dei flussi principali.
- [x] Aggiornare README, setup, contratto API e AGENTS con lo stato verificato.

L'utente ha verificato navigazione, link, avatar, PDF, accesso diretto, mobile, tastiera, focus, etichette e temi; ha inoltre ottenuto un buon risultato Lighthouse. Lint e build passano; controllati via HTTP contatori, argomenti, progetti, studenti, cataloghi materiali e 404. La build segnala un bundle JavaScript oltre la soglia di avviso Vite. Il deployment resta da decidere dopo il confronto con l'insegnante.

## Idee future — fuori dall’MVP

- Concordare deployment e visibilità della repository prima della pubblicazione. La repository resta privata finché l'utente non decide il passaggio a pubblica.
- Immagini/periodi dei progetti, repository originali, bio, descrizioni PDF e categorie risorse: aggiungere solo contenuti verificati, valutando prima file per slug/username/URL.
- Descrizioni dei topic e associazioni dirette curate ai materiali: eventuale mappatura editoriale, senza migrazione preventiva.
- Statistiche GitHub (commit, linguaggi, aggiornamento), con raccolta e cache da progettare.
- Progetti finali, completamento reale/date, progressi personali, achievements e Recruiter View avanzata richiedono definizioni e dati aggiuntivi.
- Nessuna leaderboard competitiva, autenticazione o CRUD amministrativo nell’MVP.

## In corso

MVP locale completato. L'utente deciderà i prossimi passi prima della pubblicazione della repository; il deployment rimane una decisione futura.

## Fatto

- [x] Definire brand `Class14` senza rinominare cartella o repository.
- [x] Confermare la struttura con backend in `server/` e frontend in `client/`.
- [x] Copiare le app di riferimento in `server/` e `client/`, conservando struttura e stile come base della conversione.
- [x] Organizzare la documentazione in `docs/`, mantenendo `AGENTS.md` e `KANBAN.md` nella root.
- [x] Definire elenco dei 15 studenti e 15 progetti dal periodo React in poi.
- [x] Raccogliere descrizioni dei progetti e PDF disponibili.
- [x] Salvare 15 avatar e verificare 225 URL GitHub esatti: 124 repository pubbliche associate.
- [x] Preparare schema MySQL e seed generato da studenti, progetti, PDF e repository verificate.
- [x] Importare e verificare il database locale: 15 studenti, 15 progetti, 18 PDF e 124 repository.
- [x] Associare 39 PDF ai progetti e verificare che ogni progetto e ogni PDF sia collegato.
- [x] Importare 17 risorse esterne e collegarle ai progetti con 54 associazioni verificate.
- [x] Configurare package root privato e script comuni, rimuovere tooling TypeScript diretto dal client e correggere audit (zero vulnerabilità nei tre package).

- [x] Confermare la nuova direzione e pianificare l’MVP senza modifiche allo schema, con Topics derivati, cataloghi materiali autonomi e contatori Home.

- [x] Definire e verificare il contratto API MVP: endpoint, identificatori, JSON, topics/materiali indiretti, contatori, ricerca/filtri, ordinamento ed errori; nessuna paginazione per il catalogo attuale.

- [x] Completare configurazione ambiente/pool, branding root e README backend; verificare avvio e fallimenti controllati.

- [x] Implementare e verificare API Projects e sostituire posts e le richieste legacy con i flussi Class14.

- [x] Implementare e verificare le API Students e i cataloghi Cheat Sheets/Resources, con query condivise validate e associazioni inverse.

- [x] Refactoring leggibilità: schema catalogo globale importato direttamente, query dettagli ignorate, JOIN per cataloghi/materiali e filtro Students, JSDoc descrittivi; confronto di 91 risposte invariato e casi limite verificati.

### Fase 6 verificata — 27 settembre 2026

- Topics derivati dai riepiloghi Projects, senza JSON duplicato o nuove tabelle; dettaglio con materiali indiretti già deduplicati dai cataloghi.
- Stats: una query con cinque COUNT indipendenti. Verificati 7 topics, progetti/materiali di ogni topic, lookup case insensitive, 400/404 e conteggi 15/15/124/18/17. Nessuna scrittura nel DB.
- Tre esempi validi aggiunti a test.http, riutilizzando un solo esempio 404.

### Fase 7 verificata — 27 settembre 2026

- Avatar/PDF preparati dall’utente in server/public; verificato un file per tipo, anche attraverso Vite, e file inesistenti 404.
- Proxy Vite per /api, /avatars e /cheatsheets; nessuna dipendenza CORS necessaria in locale.
- Confermati 400/404/500 senza dettagli interni; JSON malformato restituisce il messaggio 400 comune. Nessuna nuova validazione.
- Nessuna route/query attiva posts; test.http resta conciso, con due esempi statici. Script aggiornati ai file spostati; seed --check passa senza modifiche SQL o DB.
