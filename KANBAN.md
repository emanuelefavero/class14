# Class14 — Kanban

Procedere nell'ordine indicato, una fase alla volta. Spostare in **In corso** l'attività avviata e in **Fatto** quella verificata; aggiornare le caselle dei sottopassi durante il lavoro. Backend e frontend hanno cartelle e `package.json` separati: `server/` e `client/`.

## Da fare

### 1. Avvio backend — prossimo passo

- [ ] Creare `server/package.json` con ES Modules, dipendenze necessarie e comandi di avvio/sviluppo.
- [ ] Configurare Express in `server/app.js` e il pool `mysql2/promise` per `class14`.
- [ ] Leggere porta e configurazione MySQL dalle variabili d'ambiente; aggiungere `server/.env.example` senza segreti.
- [ ] Verificare che il server parta con il database disponibile e segnali chiaramente una connessione fallita.

### 2. Contratto API

- [ ] Definire endpoint di lista e dettaglio per progetti e studenti, identificatori e forma delle risposte JSON.
- [ ] Definire come restituire repository, PDF, risorse, collezioni vuote e risorse non trovate.
- [ ] Documentare il contratto API in `docs/` e scegliere solo i filtri necessari alla prima interfaccia.

### 3. API progetti

- [ ] Creare routes, controller e repository della risorsa progetti.
- [ ] Implementare la lista con titolo, slug e argomenti.
- [ ] Implementare il dettaglio con descrizione Markdown, studenti/repository, cheatsheet e risorse esterne.
- [ ] Verificare lista, dettaglio, progetto inesistente e relazioni senza duplicati.

### 4. API studenti

- [ ] Creare routes, controller e repository della risorsa studenti.
- [ ] Implementare la lista con nome, username GitHub e percorso dell'avatar.
- [ ] Implementare il dettaglio con i progetti pubblici verificati dello studente.
- [ ] Verificare studente inesistente e studente senza repository nel catalogo.

### 5. File statici e gestione errori

- [ ] Preparare avatar e PDF in `server/public/` dagli asset sorgente, rispettando i percorsi salvati nel database.
- [ ] Verificare gli URL `/avatars/...` e `/cheatsheets/...`.
- [ ] Validare i parametri HTTP e aggiungere middleware per rotte inesistenti ed errori interni.
- [ ] Verificare risposte `400`, `404` e `500` senza esporre dettagli interni.

### 6. Verifica backend e integrazione

- [ ] Preparare richieste HTTP ripetibili per i flussi principali e confrontare le risposte con il contratto documentato.
- [ ] Verificare relazioni, percorsi statici e comportamento in caso di database non disponibile.
- [ ] Definire la connessione del client all'API durante lo sviluppo (proxy Vite o CORS, secondo il setup scelto).

### 7. Struttura frontend

- [ ] Definire pagine, navigazione, lingua dell'interfaccia e direzione visiva di Class14.
- [ ] Creare `client/` con React, Vite e configurazione prevista in `AGENTS.md`.
- [ ] Impostare React Router **Declarative Mode**, `src/pages/` e `RootLayout` con `Header`, `Main`, `Outlet` e `Footer`.
- [ ] Portare solo i componenti UI/shared necessari da `react-context-api`, adattando import e CSS.
- [ ] Impostare token CSS, layout responsive, tema automatico chiaro/scuro e client API.

### 8. Pagine frontend — completare un flusso alla volta

- [ ] Collegare lista e dettaglio dei progetti alle API, includendo Markdown, repository, PDF e risorse.
- [ ] Collegare lista e dettaglio degli studenti alle API.
- [ ] Integrare l'esplorazione per argomento secondo le pagine e i filtri definiti.
- [ ] Gestire caricamento, errori, liste vuote e pagine non trovate in ciascun flusso.

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
- [x] Organizzare la documentazione in `docs/`, mantenendo `AGENTS.md` e `KANBAN.md` nella root.
- [x] Definire elenco dei 15 studenti e 15 progetti dal periodo React in poi.
- [x] Raccogliere descrizioni dei progetti e PDF disponibili.
- [x] Salvare 15 avatar e verificare 225 URL GitHub esatti: 124 repository pubbliche associate.
- [x] Preparare schema MySQL e seed generato da studenti, progetti, PDF e repository verificate.
- [x] Importare e verificare il database locale: 15 studenti, 15 progetti, 18 PDF e 124 repository.
- [x] Associare 39 PDF ai progetti e verificare che ogni progetto e ogni PDF sia collegato.
- [x] Importare 17 risorse esterne e collegarle ai progetti con 54 associazioni verificate.
