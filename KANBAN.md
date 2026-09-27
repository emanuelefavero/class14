# Class14 — Kanban

Procedere nell’ordine indicato, una fase verificabile alla volta: **prima backend, poi frontend**. Spostare in **In corso** l’attività avviata e in **Fatto** quella verificata. Server e client conservano cartelle e package separati.

## Direzione e perimetro confermati

- [PLAN.md](PLAN.md) descrive la nuova direzione: **Learning Hub** come identità principale, con **Student Showcase** integrato e senza classifiche competitive. [AGENTS.md](AGENTS.md) precisa il perimetro approvato e i limiti dei dati.
- **MVP senza modifiche allo schema `class14`**: Projects, Students, Cheat Sheets, Resources, Topics, Home con contatori, ricerca e filtri essenziali dopo le liste.
- Mantenere i 15 progetti da React in poi. Non ampliare il catalogo con gli esempi o i numeri illustrativi del piano.
- La presenza di una repository pubblica non certifica il completamento: usare “Repository disponibili”. `created_at` rappresenta l’inserimento, non una data didattica o di completamento.
- Topics derivati da `projects.topics`; materiali associati indirettamente attraverso i progetti e deduplicati. Presentarli come “Materiali dei progetti collegati”.

## Base attuale e metodo di conversione

- `server/` deriva da `express-blog-sql`; `client/` da `react-context-api`. Non ricreare lo scaffolding.
- Dipendenze, script comuni, build, lint, audit e avvio congiunto sono verificati: [docs/SETUP.md](docs/SETUP.md). I package sono già `class14`, `class14-server` e `class14-client`; i contenuti delle app restano da convertire.
- Conservare posts/products come riferimento finché le nuove feature le sostituiscono; poi rimuovere import, route, provider, richieste e contenuti pertinenti.
- Conservare React Router Data Mode salvo motivo concreto per cambiarlo; validazione manuale frontend, Zod backend. JavaScript, nessun typecheck TypeScript né nuovo JSDoc.
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

Specifica: [docs/API-CONTRACT.md](docs/API-CONTRACT.md). Contratto definito e verificato rispetto a schema/generatore; endpoint ancora da implementare.

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

### 6. Topics e contatori Home — prossimo passo

- [ ] Estrarre i tag dai progetti, rimuovere spazi esterni e duplicati; confrontare tag interi.
- [ ] Implementare elenco topics e accesso ai rispettivi progetti.
- [ ] Se previsto dal contratto, aggregare PDF/risorse via progetti, deduplicati per ID e dichiarati come collegamenti indiretti.
- [ ] Implementare conteggi delle cinque entità del catalogo, senza percentuali di completamento.
- [ ] Verificare topic inesistente, deduplicazione e conteggi; aggiungere richieste in `server/test.http`.

### 7. Statici, errori e verifica backend

- [ ] Preparare avatar e PDF in `server/public/`, rispettando i percorsi salvati nel DB.
- [ ] Verificare apertura avatar/PDF e comportamento di file inesistenti.
- [ ] Validare input HTTP e verificare 400/404/500 senza dettagli interni.
- [ ] Confrontare i flussi API con il contratto e completare `server/test.http`.
- [ ] Verificare che non rimangano route/query/documentazione attiva del blog.
- [ ] Definire proxy Vite o CORS per collegare React all’API.

### 8. Adattamento frontend — dopo il backend

- [ ] Definire lingua, direzione visiva e navigazione fra Home, Projects, Students, Topics, Resources e Cheat Sheets.
- [ ] Adattare titolo HTML, metadati, Header, Footer e documentazione a Class14; nomi package già aggiornati.
- [ ] Adattare router e pagine, conservando RootLayout con Header/Main/Outlet/Footer.
- [ ] Riutilizzare UI/shared, CSS nativo e tema automatico; verificare layout responsive.
- [ ] Configurare Axios e validatori manuali per le risposte Class14, senza Zod frontend.

### 9. Pagine MVP — un flusso alla volta

- [ ] Collegare lista/dettaglio Projects, Markdown sicuro, repository, PDF e risorse.
- [ ] Quando il flusso Projects è pronto, sostituire products e rimuovere provider/import/route/controlli pertinenti.
- [ ] Collegare lista/profilo Students con avatar, GitHub e repository disponibili.
- [ ] Creare Cheat Sheets con apertura/download PDF e progetti collegati.
- [ ] Creare Resources con link esterni e progetti collegati.
- [ ] Creare elenco/dettaglio Topics con progetti e, dove previsti, “Materiali dei progetti collegati”.
- [ ] Adattare Home alla presentazione Learning Hub + Showcase e ai contatori del catalogo.
- [ ] Gestire caricamento, errori, dati assenti e 404 nei flussi pertinenti.
- [ ] Sostituire contenuti Home/AboutUs di esempio e verificare assenza di dipendenze dalla Fake Store API.

### 10. Ricerca e filtri essenziali — dopo le liste

- [ ] Implementare la ricerca concordata su titoli, nomi e username e il filtro topic dove pertinente.
- [ ] Usare i campi esistenti, mantenendo coerente il comportamento frontend/API.
- [ ] Verificare combinazioni di filtri, reset e nessun risultato.

### 11. Rifinitura e consegna

- [ ] Verificare navigazione incrociata, link esterni, avatar, PDF e accesso diretto alle pagine di dettaglio.
- [ ] Verificare mobile, tastiera, focus, etichette e tema chiaro/scuro.
- [ ] Eseguire lint/build e controlli HTTP dei flussi principali.
- [ ] Aggiornare README, setup, contratto API e AGENTS con lo stato verificato.
- [ ] Concordare deployment e visibilità della repository prima di pubblicare.

## Idee future — fuori dall’MVP

- Immagini/periodi dei progetti, repository originali, bio, descrizioni PDF e categorie risorse: aggiungere solo contenuti verificati, valutando prima file per slug/username/URL.
- Descrizioni dei topic e associazioni dirette curate ai materiali: eventuale mappatura editoriale, senza migrazione preventiva.
- Statistiche GitHub (commit, linguaggi, aggiornamento), con raccolta e cache da progettare.
- Progetti finali, completamento reale/date, progressi personali, achievements e Recruiter View avanzata richiedono definizioni e dati aggiuntivi.
- Nessuna leaderboard competitiva, autenticazione o CRUD amministrativo nell’MVP.

## In corso

Nessuna attività di implementazione aperta. Prossima attività: fase 6, Topics e contatori Home.

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
