# Class14 — Kanban

Procedere nell'ordine indicato, una fase alla volta. Spostare in **In corso** l'attività avviata e in **Fatto** quella verificata; aggiornare le caselle dei sottopassi durante il lavoro. Backend e frontend hanno cartelle e `package.json` separati: `server/` e `client/`.

## Base attuale e metodo di conversione

- `server/` contiene già l'app `express-blog-sql`; `client/` contiene già `react-context-api`, con package e lockfile. Le dipendenze non sono ancora state installate.
- Prima convertire il server a Class14, poi il client. Non ricreare i progetti da zero.
- Conservare `posts`, `products` e le pagine di esempio come riferimento di stile finché le nuove feature non le sostituiscono. La rimozione comprende import, route, provider, contenuti e richieste di prova pertinenti.
- Il router client usa Data Mode; l'utente accetta anche Declarative Mode. Mantenere la base attuale salvo motivo concreto per cambiarla. Conservare la validazione manuale del frontend; Zod nel frontend è una possibilità futura, non un'attività attuale.
- Ricordarsi che dentro `server/db/setup` si trovano gia' gli script per creare e popolare il database `class14`, che non vanno cancellati e non fanno parte del progetto `express-blog-sql`, il db e' gia' stato inizializzato, quindi questi files possono essere ignorati (a meno che l'utente non chieda di leggerli o toccarli), ma non eliminati.

## Da fare

### 1. Adattamento e avvio backend — prossimo passo

- [ ] Adattare nome/descrizione del package e branding iniziale del server a Class14, preservando ESM, scripts e convenzioni esistenti.
- [ ] Riallineare il README del server e i riferimenti alle linee guida copiati da `express-blog-sql`.
- [ ] Rivedere `server/app.js` e `server/db/db.js`: il pool punta già a `class14`; completare la configurazione d'ambiente e adattare `server/.env.example` senza segreti.
- [ ] Installare le dipendenze del server quando si avvia l'implementazione e verificare i comandi esistenti.
- [ ] Verificare che il server parta con il database disponibile e segnali chiaramente una connessione fallita.

### 2. Contratto API

- [ ] Definire endpoint di lista e dettaglio per progetti e studenti, identificatori e forma delle risposte JSON.
- [ ] Definire come restituire repository, PDF, risorse, collezioni vuote e risorse non trovate.
- [ ] Documentare il contratto API in `docs/` e scegliere solo i filtri necessari alla prima interfaccia.

### 3. API progetti

- [ ] Creare routes, controller e repository della risorsa progetti.
- [ ] Implementare la lista con titolo, slug e argomenti.
- [ ] Implementare il dettaglio con descrizione Markdown, studenti/repository, cheatsheet e risorse esterne.
- [ ] Dopo la verifica dei progetti, rimuovere `server/resources/posts/` e la sua registrazione; sostituire le richieste posts in `server/test.http` con quelle dei progetti.
- [ ] Verificare lista, dettaglio, progetto inesistente e relazioni senza duplicati.

### 4. API studenti

- [ ] Creare routes, controller e repository della risorsa studenti.
- [ ] Implementare la lista con nome, username GitHub e percorso dell'avatar.
- [ ] Implementare il dettaglio con i progetti pubblici verificati dello studente.
- [ ] Aggiungere a `server/test.http` le richieste per studenti e aggiornare i contenuti root dell'API con le risorse Class14.
- [ ] Verificare studente inesistente e studente senza repository nel catalogo.

### 5. File statici e gestione errori

- [ ] Preparare avatar e PDF in `server/public/` dagli asset sorgente, rispettando i percorsi salvati nel database.
- [ ] Verificare gli URL `/avatars/...` e `/cheatsheets/...`.
- [ ] Validare i parametri HTTP usando le convenzioni Zod già presenti nel server e adattare i middleware 404/errori esistenti dove necessario.
- [ ] Verificare risposte `400`, `404` e `500` senza esporre dettagli interni.

### 6. Verifica backend e integrazione

- [ ] Completare `server/test.http` con richieste ripetibili per i flussi principali e confrontare le risposte con il contratto documentato.
- [ ] Verificare che il backend convertito non contenga più route, query o documentazione attiva legate al blog.
- [ ] Verificare relazioni, percorsi statici e comportamento in caso di database non disponibile.
- [ ] Definire la connessione del client all'API durante lo sviluppo (proxy Vite o CORS, secondo il setup scelto).

### 7. Adattamento frontend — dopo il backend

- [ ] Definire pagine, navigazione, lingua dell'interfaccia e direzione visiva di Class14.
- [ ] Adattare package, titolo HTML, metadati, header, footer e documentazione del client a Class14.
- [ ] Installare le dipendenze del client e verificare Vite/React Compiler già configurati.
- [ ] Adattare router, `src/pages/` e `RootLayout` esistenti con `Header`, `Main`, `Outlet` e `Footer`; mantenere Data Mode salvo scelta motivata diversa.
- [ ] Riutilizzare i componenti UI/shared già presenti e adattare CSS, layout responsive e tema automatico chiaro/scuro.
- [ ] Collegare il client Axios alle API Class14 e adattare i validatori manuali alle nuove risposte, senza introdurre Zod nel frontend.

### 8. Pagine frontend — completare un flusso alla volta

- [ ] Collegare lista e dettaglio dei progetti alle API, includendo Markdown, repository, PDF e risorse.
- [ ] Quando il flusso progetti è pronto, sostituire `client/src/features/products/` e `client/src/pages/products/`, aggiornando provider, import, router e controlli specifici nell'Header.
- [ ] Collegare lista e dettaglio degli studenti alle API.
- [ ] Integrare l'esplorazione per argomento secondo le pagine e i filtri definiti.
- [ ] Gestire caricamento, errori, liste vuote e pagine non trovate in ciascun flusso.
- [ ] Sostituire progressivamente Home/AboutUs e le richieste di esempio con contenuti Class14; verificare che non restino dipendenze dalla Fake Store API.

### 9. Rifinitura e consegna

- [ ] Verificare navigazione, link esterni, avatar, PDF e aggiornamento diretto delle pagine di dettaglio.
- [ ] Verificare mobile, tastiera, focus visibile, etichette e tema chiaro/scuro.
- [ ] Eseguire lint/build e i controlli dei flussi principali previsti dal progetto.
- [ ] Scrivere README di avvio/configurazione e aggiornare documentazione API e `AGENTS.md`.
- [ ] Concordare con l'utente deployment e visibilità della repository prima della pubblicazione.

Contatori di commit e classifiche sono idee successive alla prima versione e non fanno parte delle attività attuali.

## In corso

Nessuna attività aperta.

## Fatto

- [x] Definire brand `Class14` senza rinominare cartella o repository.
- [x] Confermare la struttura con backend in `server/` e frontend in `client/`.
- [x] Copiare le app di riferimento in `server/` e `client/`, conservando struttura e stile come base della conversione (installazione e avvio ancora da verificare).
- [x] Organizzare la documentazione in `docs/`, mantenendo `AGENTS.md` e `KANBAN.md` nella root.
- [x] Definire elenco dei 15 studenti e 15 progetti dal periodo React in poi.
- [x] Raccogliere descrizioni dei progetti e PDF disponibili.
- [x] Salvare 15 avatar e verificare 225 URL GitHub esatti: 124 repository pubbliche associate.
- [x] Preparare schema MySQL e seed generato da studenti, progetti, PDF e repository verificate.
- [x] Importare e verificare il database locale: 15 studenti, 15 progetti, 18 PDF e 124 repository.
- [x] Associare 39 PDF ai progetti e verificare che ogni progetto e ogni PDF sia collegato.
- [x] Importare 17 risorse esterne e collegarle ai progetti con 54 associazioni verificate.
