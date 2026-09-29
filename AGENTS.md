# Class14 — guida per continuare il progetto

Ultimo aggiornamento del contesto: 29 settembre 2026. Questo file raccoglie le decisioni confermate e lo stato del lavoro per riprendere in una nuova chat. Verificare sempre i file e `git status` prima di intervenire: lo stato descritto può evolvere.

## Obiettivo e contesto

- L'utente è Emanuele Favero (`emanuelefavero` su GitHub), studente Boolean Web Development Part Time, classe **WDPT14**.
- Il corso base sta terminando. Questo è il progetto finale full stack, da mostrare ai recruiter, con tema scelto liberamente: un hub della classe per esplorare studenti, progetti svolti e materiali di ripasso.
- Il brand visibile è **Class14**. La cartella e la repository restano **webapp-express**: non rinominarle.
- L'utente ha inizializzato Git e pubblicato la repository, dichiarandola privata per ora. Non fare commit, push o cambi di visibilità senza richiesta.
- Il catalogo comprende i **15 progetti dal periodo React in poi**, inclusi i successivi esercizi Node, Express e database. Gli esercizi precedenti HTML/CSS/JavaScript restano fuori.
- Lavorare una fase alla volta. La priorità è una soluzione completa, leggibile e professionale, con tecniche appropriate al corso, senza architetture speculative.

## Organizzazione della documentazione

- Nella root restano `README.md` e `AGENTS.md`.
- `docs/` contiene `PLAN.md`, `KANBAN.md`, `DESIGN.md`, il contratto API, le istruzioni di setup e le linee guida di stile.
- I documenti e i dati usati per preparare il database sono stati spostati in `.local/`, ignorata da Git. Non sono necessari per eseguire l'app o importare gli SQL; il README SQL resta in `server/db/setup/`.
- I percorsi scritti nei documenti si riferiscono alla root del progetto, salvo i link Markdown relativi.

## Cosa leggere prima di lavorare

1. Questo file, [docs/CODE-STYLE-GUIDELINES.md](docs/CODE-STYLE-GUIDELINES.md), [docs/KANBAN.md](docs/KANBAN.md), [docs/DESIGN.md](docs/DESIGN.md) per il frontend e [docs/API-CONTRACT.md](docs/API-CONTRACT.md) per le API.
2. [docs/PLAN.md](docs/PLAN.md) per la nuova direzione Learning Hub + Student Showcase.
3. I file pertinenti alla fase corrente. Per il database: [server/db/setup/README.md](server/db/setup/README.md), [schema.sql](server/db/setup/schema.sql).

Se disponibile, usare la skill locale `.agents/skills/boolean-course-exercises/SKILL.md`. `.agents/` è ignorata da Git e potrebbe mancare in altri ambienti: le istruzioni essenziali sono in questo file.

Le decisioni esplicite dell’utente e l’MVP confermato qui prevalgono sulle proposte più ampie di `docs/PLAN.md`. Il client usa React Router Declarative Mode per scelta dell’utente.

## Nuova direzione e MVP confermato

L’utente ha approvato la prima versione proposta dopo il confronto di `docs/PLAN.md` con lo schema. Il brand resta **Class14**. L’identità principale è **Learning Hub**, con uno **Student Showcase** integrato: consultare materiali e mostrare il percorso della classe, senza classifiche competitive.

**Per l’MVP mantenere le sette tabelle e lo schema attuale di `class14`, senza migrazioni né nuove tabelle.** Non occorre aggiungere colonne per implementare il perimetro seguente:

| Sezione                     | Contenuti della prima versione                                                                  | Fonte                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Projects                    | Lista e dettaglio: descrizione Markdown, topics, studenti/repository, PDF e risorse             | `projects` e le tre tabelle ponte                                                  |
| Students                    | Lista e profilo: nome, avatar, link GitHub, repository pubbliche del catalogo                   | `students`, `student_projects`, `projects`                                         |
| Cheat Sheets                | Catalogo autonomo, apertura/download PDF e collegamenti ai progetti                             | `cheatsheets`, `project_cheatsheets`                                               |
| Resources                   | Catalogo autonomo di titoli/link e collegamenti ai progetti                                     | `resources`, `project_resources`                                                   |
| Topics                      | Elenco dei tag unici e dettaglio con progetti, PDF e risorse collegati attraverso quei progetti | `projects.topics`, separato e normalizzato in lettura; tabelle ponte dei materiali |
| Home                        | Presentazione del Learning Hub e contatori di studenti, progetti, repository, PDF e risorse     | Conteggi delle tabelle esistenti                                                   |
| Ricerca e filtri essenziali | Ricerca su titoli/nomi/username e filtro per topic nelle quattro liste supportate               | `q` e `topic` definiti nel contratto API                                           |

### Gerarchia delle pagine e navigazione confermata

- **Tre sezioni principali nell'header:** Argomenti, Progetti e Studenti. Il logo Class14 porta alla Home. Cheat sheet e Risorse mantengono i propri cataloghi completi, raggiungibili da Home, footer e collegamenti nelle pagine pertinenti; i loro URL diretti restano validi.
- Le liste sono punti di ingresso ai dettagli, non pagine isolate. Dal dettaglio argomento si aprono progetti e materiali dei progetti collegati; dal dettaglio progetto si aprono profili degli studenti, repository verificate, PDF, risorse e topic; dal profilo studente si torna ai progetti. I cataloghi materiali riportano ai progetti collegati.
- Il contratto API già fornisce questi dati: `TopicDetail.projects` e `related_*`, `ProjectDetail.students` con `repo_url` più `cheatsheets` e `resources`, `StudentDetail.projects` con `repo_url`, e `projects` nei cataloghi materiali. Non serve cambiare schema o aggiungere endpoint per questo flusso.
- La relazione topic–materiale è indiretta e si presenta come “Materiali dei progetti collegati”. `student_projects` attesta una repository pubblica verificata, non il completamento dell'esercizio: usare “Repository disponibili”.
- L'header del client mostra le tre sezioni principali; liste, dettagli, cataloghi materiali e collegamenti incrociati sono presenti. Ricerca e filtri delle quattro liste supportate sono implementati con parametri URL. [docs/DESIGN.md](docs/DESIGN.md) contiene la struttura UX da seguire.

### Contratto API definito — fase 1 completata

La specifica completa è [docs/API-CONTRACT.md](docs/API-CONTRACT.md), verificata rispetto allo schema e ai percorsi del generatore. **Projects, Students, Cheat Sheets/Resources, Topics e Stats sono implementati.**

- GET sotto `/api`: projects e students con lista/dettaglio; cheatsheets e resources come cataloghi autonomi con progetti collegati; topics con lista/dettaglio; stats per i cinque contatori globali.
- Dettagli progetto per slug, studente per github_username; topic per nome del tag URL-encoded (non un nuovo slug o ID). Lookup case insensitive con grafia salvata/canonica in risposta.
- JSON diretto, array per liste e oggetto per dettagli, campi snake_case coerenti col DB; topics trasformato in array. Collezioni vuote `[]`, valori nullable `null`, niente created_at nell’MVP.
- Riepiloghi condivisi e collezioni non ricorsive, deduplicate per ID. StudentDetail contiene repository_count e topics derivati; TopicDetail contiene related_cheatsheets/related_resources come collegamenti indiretti.
- Nessuna paginazione o parametro sort. Ordinamento fisso e deterministico secondo il contratto. `q` e `topic` ammessi sulle quattro liste principali, con AND; ricerca letterale case insensitive e match topic intero. Query di lista sconosciute/ripetute/strutturate sono 400; i dettagli Projects/Students ignorano le query inutilizzate.
- Errori JSON `{ "message": "..." }` con 400/404/500, senza dettagli interni. Entità assente 404, lista/relazione vuota 200. Le vecchie routes/middleware vanno allineate durante la conversione.
- URL GitHub derivato dallo username; repo_url letto dalla relazione verificata. Avatar/PDF con slash iniziale all’origine backend, conservando il percorso SQL. Proxy Vite configurato per `/api`, `/avatars` e i file sotto `/cheatsheets/`; usare URL relativi in locale.
- Per PDF/risorse nessun dettaglio autonomo JSON richiesto: i cataloghi forniscono progetti collegati e link di apertura.

### Semantica dei dati da rispettare

- `student_projects` prova l’esistenza di una repository pubblica verificata, non il completamento dell’esercizio. Usare etichette come “Repository disponibili”; non mostrare percentuali di completamento o badge “completato” dedotti dalla presenza della repository.
- `created_at` è la data di inserimento del record, non la data della lezione, del progetto, della pubblicazione del PDF o del completamento. Non riutilizzarla per questi significati.
- Le tecnologie eventualmente mostrate sul profilo si ricavano dai topics dei progetti associati: indicano argomenti del percorso, non competenze certificate né linguaggi rilevati da GitHub.
- Contatori e statistiche semplici devono riferirsi al catalogo presente, non a tutte le repository del profilo GitHub o a tutto il corso.

### Topics e materiali senza normalizzare il database

- Ricavare i topics dai tag separati da virgola in `projects.topics`: rimuovere spazi esterni, evitare duplicati e confrontare tag interi, non sottostringhe. Conservare il campo SQL attuale.
- La pagina di un topic mostra i progetti che possiedono quel tag. PDF e risorse si possono ricavare attraverso quei progetti e deduplicare per ID.
- Questi collegamenti sono indiretti: un PDF di un progetto non è necessariamente specifico di ciascun suo tag. Presentarli come **“Materiali dei progetti collegati”**, senza affermare un’associazione diretta al topic.
- Descrizioni editoriali dei topic e associazioni precise ai materiali possono essere aggiunte in futuro in Markdown o con una piccola mappatura JavaScript esplicita. Non sono prerequisiti dell’MVP e non richiedono nuove tabelle adesso.
- Il catalogo resta da React in poi. Gli esempi HTML/CSS o i numeri illustrativi di `docs/PLAN.md` non ampliano automaticamente i dati o il perimetro.

### Possibilità successive, escluse dalla prima versione

- Immagini/periodi dei progetti, repository originali degli esercizi, bio, descrizioni PDF e categorie delle risorse richiedono contenuti verificati aggiuntivi. Se necessari, valutare file associati a slug/username/URL con una fonte unica per contenuto, prima di proporre migrazioni.
- Commit, linguaggi e ultimo aggiornamento GitHub richiedono raccolta e cache aggiuntive; non sono presenti nel database. Non fare chiamate GitHub live per l’MVP.
- Progetti finali degli studenti, completamento reale/date, progressi personali, achievements e Recruiter View avanzata restano futuri e richiedono di definire dati e significato.
- Nessuna leaderboard, top 5, autenticazione o CRUD amministrativo nell’MVP.

## Decisioni tecniche confermate

### Backend

- Node.js, Express, ES Modules, JavaScript, `mysql2/promise`, `async/await` e pool MySQL.
- Organizzazione per risorsa: routes, controller, repository e schemas dove necessari. Zod per la validazione dei confini HTTP quando utile.
- Query parametrizzate; repository indipendenti da Express; middleware centralizzati per 404 ed errori.
- Credenziali e configurazione del database tramite variabili d'ambiente. Non fissare nel codice le credenziali usate durante le verifiche locali.
- Avatar e PDF sono serviti da `server/public/` con percorsi `/avatars/...` e `/cheatsheets/...`.

### Frontend

- React con Vite, JavaScript senza TypeScript. React Compiler già configurato in `client/vite.config.js`; verificarne il funzionamento quando verranno installate le dipendenze.
- Il client usa **React Router Declarative Mode**: `BrowserRouter`, `Routes` e `Route` in `client/src/App.jsx`. `client/src/router/paths.js` definisce gli URL e i link del menu. Non aggiungere loader/action o configurazioni route a oggetti senza una necessità concreta.
- Conservare pagine in `src/pages/` e `RootLayout` in `client/src/`, con `Outlet` dentro `Main`, `Header` e `Footer`. Eventuali altri layout vanno vicino alle pagine che li usano, solo quando servono davvero.
- Il frontend usa Axios e Zod per validare input e risposte delle richieste HTTP quando necessario. Tenere gli schemi vicino alla feature, in `schemas.js`; non usare Zod per stato React, componenti o semplici controlli locali. La dipendenza è già installata in `client/`.
- L'interfaccia frontend dell'MVP è in italiano: navigazione, pulsanti, filtri, stati e testi delle pagine. Codice, API, percorsi, slug e nomi originali di progetti e tecnologie restano in inglese. Valutare una versione inglese dopo la verifica; per ora non serve un sistema multilingua.
- La direzione visiva e i flussi UX sono definiti in [docs/DESIGN.md](docs/DESIGN.md): Home come hub editoriale, tre sezioni primarie, percorso Argomenti → Progetti → Studenti e materiali collegati, dettagli come schede visuali sobrie e un solo accento blu indaco. Consultarlo prima di progettare pagine e componenti.
- CSS nativo, CSS nesting, custom properties e tema automatico con `prefers-color-scheme`. Nessun Bootstrap o framework CSS. L'ispirazione shadcn/ui è visiva, non una richiesta di installarlo.
- Componenti separati in `components/ui`, `components/shared`, `components/layout`; CSS vicino ai componenti. Stato locale e props, Context solo per esigenze concrete.
- Export nominati, apici singoli, indentazione di 2 spazi, punto e virgola. Evitare JSDoc per typing; usare JSDoc brevi e descrittivi sui metodi repository e commenti nei passaggi meno evidenti. Conservare l’esempio input/output di `normalizeProjectTopics`. Seguire le convenzioni qui raccolte e lo stile dei riferimenti locali.

### Riferimenti locali da consultare

- `/Users/emanuelefavero/code/boolean/express-blog-sql`: stile Express, repository SQL, validazione, middleware e organizzazione per risorsa.
- `/Users/emanuelefavero/code/boolean/react-context-api`: componenti, CSS e organizzazione React. In particolare `src/components/ui` e `src/components/shared` contengono componenti riutilizzabili dell'utente.
- Queste app sono ora copiate in `server/` e `client/`: usare soprattutto il codice presente nel progetto come riferimento. I componenti UI/shared, `cx`, le icone e il CSS sono già in `client/`; riutilizzarli dove pertinenti.
- Non leggere `node_modules`, build o cache dei riferimenti. Non copiare indiscriminatamente il router o l'intera applicazione.

## Stato attuale: MVP locale completato

L’utente ha copiato `express-blog-sql` dentro `server/` e `react-context-api` dentro `client/` come punti di partenza. I tre package hanno dipendenze e lockfile. Server, Home e pagine MVP ora usano Class14; non fare nuovo scaffolding.

- `server/app.js` registra `projects`, `students`, `cheatsheets`, `resources`, `topics`, `stats`, `root` ed `errors`; posts è stato rimosso. `server/db/db.js` legge la configurazione validata da `server/config/env.js`: host, porta, utente, password, database, limite e timeout. `DB_USER` è obbligatoria; il database predefinito è `class14`. Le routes Projects leggono soltanto il database Class14.
- Il package server si chiama `class14-server`; README e risposta root sono adattati a Class14; posts è stato rimosso; errors resta temporaneamente per le verifiche dei middleware. Il README copiato non è la fonte per il setup del database: seguire `server/db/setup/README.md`.
- `server/test.http` contiene richieste delle API Class14 e pochi casi di validazione/errori.
- Il package client si chiama `class14-client`. Home, tre sezioni principali, cataloghi materiali, dettagli e footer sono adattati a Class14. I vecchi componenti Products, provider, route e chiamate Fake Store API sono stati rimossi dopo l'implementazione di Projects.
- Le risposte del catalogo sono validate con Zod in `client/src/features/catalog/`; `react-markdown` rende le descrizioni senza HTML non attendibile. Vite inoltra `/cheatsheets/` per i PDF, lasciando `/cheatsheets` alla route React.
- Il fetching client usa hook espliciti per risorsa in `client/src/features/catalog/` e `client/src/features/stats/`. `useCatalogFilters` gestisce soltanto i parametri URL; non passare funzioni `fetch*` a hook generici né reintrodurre dependency injection senza una necessità concreta.
- L’ordine concordato è **prima server, poi client**, una modifica verificabile alla volta. Rinominare progressivamente package, titoli, documentazione e contenuti al brand Class14 nel sottoprogetto su cui si sta lavorando; non rinominare la repository.
- Esiste anche `server/AGENTS.md`, copiato dal riferimento: leggerlo per modifiche al server. I riferimenti sono riallineati a `../AGENTS.md`, `../docs/CODE-STYLE-GUIDELINES.md` e `../docs/API-CONTRACT.md`.
- È stata rilevata anche una cartella aggiuntiva `express-blog-sql/` nella root. Non è il backend attivo, che è `server/`; non rimuoverla o modificarla senza verificarne lo scopo con l’utente.

Il database locale **class14** è stato creato e popolato dall'utente. Successivamente sono stati applicati e verificati anche i collegamenti ai PDF e le risorse esterne.

| Tabella               | Righe verificate |
| --------------------- | ---------------: |
| `students`            |               15 |
| `projects`            |               15 |
| `cheatsheets`         |               18 |
| `resources`           |               17 |
| `student_projects`    |              124 |
| `project_cheatsheets` |               39 |
| `project_resources`   |               54 |

- Tutti i 15 progetti hanno almeno un PDF e una risorsa; tutti i 18 PDF e le 17 risorse sono collegati.
- Le tre tabelle ponte hanno chiavi primarie composte e foreign key con `ON DELETE CASCADE`.
- `projects.topics` è attualmente una stringa di tag separati da virgola; non è una relazione normalizzata. Non cambiarla implicitamente durante l'implementazione delle API.
- `students.github_username`, `projects.slug`, `cheatsheets.slug` e `resources.url` sono chiavi naturali uniche. Le associazioni SQL cercano gli ID tramite queste chiavi: non dipendono da ID numerici fissi.
- Le descrizioni dei progetti sono Markdown salvato nel database. Quando verranno renderizzate, scegliere una soluzione che gestisca il Markdown senza eseguire HTML non attendibile.

## Asset e loro significato

- `server/public/avatars/` contiene i 15 avatar serviti dall'app; `server/public/cheatsheets/` contiene i 18 PDF. I percorsi sono già salvati nel database e nel seed.
- Le sorgenti usate per preparare studenti, progetti, descrizioni, associazioni e risorse sono ora in `.local/assets/`, fuori da Git. Per una nuova installazione usare gli SQL versionati, senza richiedere questi file locali.
- Il catalogo include solo i 15 progetti da React in poi, con 124 URL di repository pubbliche verificate. Una repository non trovata non dimostra che lo studente non abbia fatto l'esercizio.
- Le associazioni fra progetti e PDF sono curate; i tag dei progetti non bastano per ricostruirle. I link esterni delle risorse non sono stati verificati online e non vanno sostituiti automaticamente.

## Database: come continuare senza perdere dati

- `server/db/setup/schema.sql` crea il database e le sette tabelle se non esistono. `server/db/setup/seed.sql` contiene tutti i dati e i collegamenti necessari per una nuova installazione; vedere `server/db/setup/README.md`.
- `schema.sql` e `seed.sql` sono i soli file SQL di setup versionati. Il seed comprende anche tutte le associazioni; non servono gli asset in `.local/` per importarlo.
- Gli script di preparazione sono in `.local/scripts/`, ignorata da Git; dopo lo spostamento i loro percorsi interni non sono stati aggiornati. Non considerarli parte del setup versionato e non eseguirli senza prima adattarli.
- Il seed aggiorna righe con la stessa chiave naturale e aggiunge associazioni senza duplicarle. **Non rimuove** record o associazioni diventati obsoleti: una futura sincronizzazione con cancellazioni richiede una decisione esplicita.
- Non rileggere tutto `seed.sql` per capire il progetto: è un file lungo. Leggere prima lo schema e la documentazione del setup.
- Il database è già popolato: non ricrearlo, svuotarlo o rieseguire import senza una ragione concreta. Le istruzioni per una nuova installazione sono nel README del setup SQL.
- In questa sessione MySQL era raggiungibile con il client locale e accesso fuori dalla sandbox; nella sandbox i messaggi di connessione fallivano. Verificare il contesto prima di diagnosticare il database come spento. Una vecchia prova con un server temporaneo era andata in crash, ma il database reale è poi stato verificato con successo.

## GitHub e segreti

- `.env` contiene un `GITHUB_TOKEN` locale, verificato valido durante la sessione. Non leggerne o stamparne il valore. È ignorato da Git e non serve all'app per mostrare i dati già raccolti.
- Il token fine-grained è stato rimosso da `.env` dall'utente; esiste ancora sul suo account per un altro progetto. Ignorarlo: non revocarlo, cercarlo o riutilizzarlo.
- Lo script di sincronizzazione spostato in `.local/scripts/` usa richieste anonime: API GitHub per gli avatar e controlli HTTP sugli URL pubblici esatti delle repository. Non usa il token né `gh` per enumerare repository.
- Regola confermata: costruire esclusivamente `https://github.com/{username}/{projectSlug}`. Non cercare nomi simili o altre repository nei profili. Un redirect verso un nome diverso non è una corrispondenza valida.
- Una precedente scansione autenticata con il token ampio di `gh` è stata respinta dalla revisione automatica perché poteva leggere dati privati. Il lavoro è stato completato con controlli pubblici anonimi. Non usare questo episodio come motivo per richiedere nuovi token per il catalogo attuale.

## Stato della consegna e prossime decisioni

### 1. Backend Express — completato per l'MVP

- Contratto API completato in `docs/API-CONTRACT.md`. Backend verificato fino alla fase 7; package e dipendenze sono adattati/installati.
- Configurazione ambiente, pool, template e controllo connessione sono completati; usare `server/README.md` per il setup.
- File statici già spostati dall’utente in server/public; mantenere i percorsi già salvati nel database.
- Liste e dettagli di Projects/Students, cataloghi PDF/risorse, Topics e contatori sono implementati secondo `docs/API-CONTRACT.md` e verificati con dati reali.
- L'alias degli import Node usa `#app/*` in `server/package.json` e nel codice server; `#/…` impediva l'avvio con Node locale.

### 2. Frontend React — pagine MVP e filtri completati

- Home, Projects, Students, Cheat Sheets, Resources e Topics hanno liste/dettagli dove previsti, con stati di caricamento, errore e assenza dati. Le descrizioni Markdown sono renderizzate senza HTML non attendibile.
- Le route di lista e dettaglio sono in `client/src/router/paths.js`; i link tra argomenti, progetti, studenti, repository e materiali sono attivi. Products e Fake Store API sono stati rimossi.
- Progetti, Studenti, Cheat sheet e Risorse usano `q` e `topic` dell'API. Il client conserva i filtri nell'URL e offre reset e stato senza risultati.
- Le icone SVG delle tecnologie sono asset frontend in `client/src/assets/icons/`. `client/src/features/catalog/catalogIcons.js` associa topic e slug progetto alle icone, senza campi SQL o modifiche al contratto API; il componente condiviso `CatalogIcon` le mostra come elementi decorativi nei titoli delle liste e dei dettagli.

### 3. Rifinitura locale completata; pubblicazione da decidere

- L'utente ha verificato navigazione incrociata, link esterni, avatar, PDF, accessi diretti, mobile, tastiera, focus, etichette e temi chiaro/scuro. Ha eseguito Lighthouse e riferito un buon punteggio. Lint, build e controlli HTTP essenziali sono riusciti il 29 settembre 2026. README root, setup e contratto API sono aggiornati. La build mostra un avviso Vite per un bundle JavaScript oltre 500 kB.
- Deployment e hosting restano decisioni future, da affrontare dopo il confronto con l'insegnante. La repository rimane privata; l'utente deciderà i prossimi passi prima di renderla pubblica. Non fare commit, push, deployment o cambi di visibilità senza richiesta.
- Contatori di commit e Recruiter View avanzata sono futuri; la nuova direzione esclude classifiche competitive. Non aggiungere autenticazione, CRUD amministrativo o recensioni senza definirne prima lo scopo con l’utente.

## Regole operative per gli agenti

- La leggibilità ha precedenza sulla compattezza, sia nel backend sia nel frontend. Usare liberamente `&&`, `||`, `??`, ternari e spread quando il significato si comprende al primo sguardo; evitare condizioni annidate e catene di trasformazioni concentrate in una sola espressione. Quando una riga richiede di essere decifrata, separare i passaggi con variabili dai nomi descrittivi o condizioni esplicite. Cercare una via di mezzo: non espandere inutilmente le espressioni semplici.

- Rispondere normalmente in italiano. Preservare modifiche dell'utente e controllare il diff prima e dopo ogni fase.
- Aggiornare `docs/KANBAN.md` e i documenti pertinenti quando una fase è verificata; aggiornare questo file quando cambia una decisione importante.
- Evitare letture massive di SQL generato, PDF e dati di checkpoint quando bastano sorgenti piccoli.
- Verificare il lavoro con i controlli pertinenti e riportare separatamente ciò che è stato implementato e ciò che non è stato verificato.
- Non trasformare automaticamente un suggerimento futuro in un requisito. Proseguire una fase alla volta, mantenendo la continuità con il codice dell'utente.

## Setup npm verificato

- Il package root privato `class14` coordina server e client con concurrently, senza workspaces. I tre package hanno lockfile separati.
- Comandi e configurazione: [docs/SETUP.md](docs/SETUP.md). `npm run dev` avvia entrambi; `npm run install:all` reinstalla dai lockfile.
- Rimossi script typecheck, dipendenza diretta TypeScript e tipi React; il client usa JavaScript e jsconfig per alias/editor. Nessun JSDoc per typing; conservare l’esempio esplicativo richiesto per `normalizeProjectTopics`. Il formatter usa il plugin di ordinamento import già impiegato nel server.
- Verificati build e lint client, connessione MySQL e i flussi principali con dati reali. Il vecchio Products non è più nel client. Le verifiche precedenti di audit dei tre package avevano dato zero vulnerabilità; l'installazione di `react-markdown` ha dato zero vulnerabilità nell'audit npm del client.
- Gli script server caricano opzionalmente `server/.env`; la `.env` root non viene caricata dal server. Non richiedere il token GitHub per avviare l’app.

## Fase 2 backend verificata

- Configurazione ambiente con Zod in `server/config/env.js`; credenziali solo da ambiente. `server/.env.example` elenca tutte le opzioni; creato localmente `server/.env` dal template, ignorato da Git. Non stamparne i valori.
- Risposta `GET /` e README server adattati a Class14, senza dichiarare attive le API ancora da implementare. Posts è stato sostituito nella fase 3; errors resta per i controlli middleware.
- Verificati avvio con configurazione personalizzata (porta HTTP 3314, host TCP, pool/timeout), risposta root Class14, configurazione non valida, connessione rifiutata e porta HTTP occupata. I fallimenti terminano con codice non zero e senza log di credenziali.
- Nessuna modifica allo schema/dati MySQL; processo di verifica arrestato. Prossima fase: Topics e contatori Home.

## Fase 3 Projects verificata

- `server/resources/projects/` contiene routes, controller, schemas e repository. GET `/api/projects` e GET `/api/projects/:slug` sono attivi; nessun CRUD.
- Lista filtrata in JavaScript per il catalogo piccolo: q letterale case insensitive, topic intero, AND; niente wildcard SQL. Dettaglio con query parametrizzate separate per le tre relazioni, evitando moltiplicazioni da join.
- `server/utils/catalog.js` normalizza i topics usando la grafia della prima occorrenza nei progetti ordinati per ID e ordina i tag; è riutilizzabile nelle prossime risorse.
- Rimosso `server/resources/posts/` e la registrazione. Root/README/test.http aggiornati; 404 comune `{ "message": "Not Found" }` e URIError nei percorsi API restituisce 400 generico.
- Verificati tutti i 15 dettagli contro il DB: 124 collegamenti studenti, 39 PDF, 54 risorse, campi e ordinamento coerenti, nessun duplicato. Verificati slug case insensitive, AND, risultati vuoti, q letterale, query sconosciute/ripetute/strutturate, controllo lunghezze/caratteri, 400/404 e /posts rimosso.
- Nessuna modifica ai dati. I percorsi dei file sono restituiti dal DB, ma la preparazione/verifica degli statici è ancora fase 7. Prossimo passo: fase 6 Topics e contatori Home.

- Preferenza di leggibilità confermata: nomi descrittivi nei repository (`search`, non `q`); `q` resta il parametro HTTP del contratto, tradotto nel controller. Separare trasformazioni e ordinamenti in variabili intermedie quando rendono più chiaro il flusso.

## Fasi 4 e 5 verificate

- GET `/api/students` e GET `/api/students/:github_username`: lista ordinata e profilo con repository_count/topics derivati. Identità per username, non nome; repository presenti non certificano completamento.
- GET `/api/cheatsheets` e GET `/api/resources`: cataloghi autonomi con tutti i progetti collegati, anche nelle risposte filtrate per topic. Collegamenti indiretti ai topics, nessuna categoria/descrizione/data aggiunta.
- Schema query condiviso in `server/schemas/querySchemas.js`, importato direttamente nei controller di lista, senza riesportazioni/alias: q è tradotto in search nel controller; filtri letterali, AND e validazione coerenti.
- Verificati 15 profili, 124 associazioni repository, 18 PDF e 17 risorse, con confronto DB completo e relazioni inverse verso Projects. Tre studenti senza repository verificati sui dati reali; fixture isolate per materiali senza collegamenti, senza scritture DB.
- Verificati ordinamento, campi, conteggi, username case insensitive, filtri, risultati vuoti e query invalide/404. Ripetuti i controlli Projects dopo l’estrazione dello schema query condiviso.
- Root/README/contratto/test.http/Kanban aggiornati. Statici non ancora preparati (fase 7); prossimo passo fase 6 Topics e contatori Home.

## Refactoring leggibilità del 27 settembre 2026

- `catalogQuerySchema` vive in `server/schemas/querySchemas.js` con esempio HTTP/req.query. Rimosso emptyQuerySchema e i file schemas che contenevano soltanto riesportazioni; schemi params locali preservati.
- Dettagli Projects/Students ignorano query aggiuntive: contratto e test.http aggiornati. La validazione delle query utilizzate dalle liste resta invariata.
- Cataloghi materiali: LEFT JOIN con tabelle ponte, raggruppamento esplicito per ID e nessun Set ridondante per deduplicare le coppie garantite dalla PK. Il filtro topic seleziona materiali senza ridurre i loro progetti restituiti.
- Students con topic: JOIN parametrizzato con DISTINCT, senza caricare tutti i collegamenti. Riutilizzati i riepiloghi Projects per topics canonici; nessuna transazione o migrazione introdotta.
- JSDoc brevi in inglese su ogni metodo pubblico repository, senza typing. Comparatore progetti condiviso in utils/catalog.js.
- Confrontate 91 risposte HTTP prima/dopo: equivalenti. Verificati tutti i dati/relazioni reali, i 3 studenti senza repository e fixture isolate di materiali senza progetti. Verificato il cambiamento intenzionale delle query nei dettagli. Prossima fase resta Topics e contatori Home.

### Fase 6 completata — Topics e contatori Home

- `/api/topics` e `/api/topics/:name`: tag ricavati da Projects, conteggi e materiali indiretti tramite i cataloghi esistenti. Nessun file JSON duplicato, nuova tabella o helper generico.
- `/api/stats`: cinque COUNT indipendenti in una query; nessun numero codificato nel server.
- Solo il parametro dinamico topic viene validato; query inutilizzate ignorate. Contratto aggiornato in coerenza con la scelta di semplicità.
- Verifica HTTP sul DB locale: tutti i 7 topics, conteggi, progetti/materiali deduplicati, lookup case insensitive, un caso 400 e uno 404; stats 15/15/124/18/17. Nessuna scrittura nel DB. Processo temporaneo arrestato.
- Prossima fase: **7. Statici, errori e verifica backend**. Test HTTP mantenuti concisi.

### Fase 7 completata — statici e collegamento React

- L’utente ha spostato i 15 avatar e 18 PDF da assets a server/public; preservare lo spostamento. Generatore seed e sincronizzazione avatar ora usano server/public; nessun reimport DB. Seed --check passa.
- `client/vite.config.js` inoltra `/api`, `/avatars` e i file sotto `/cheatsheets/` al backend localhost:3000, oppure alla porta PORT esportata nel terminale. La pagina `/cheatsheets` resta a React. Usare URL relativi dal client; nessuna dipendenza CORS. Se PORT è cambiata solo in `server/.env`, allineare il target Vite (vedere `docs/SETUP.md`).
- Verificato un avatar e un PDF, stessi byte e Content-Type attraverso il proxy; file inesistenti 404. Errori 400/404/500 JSON senza dettagli interni, compreso JSON malformato. Nessuna route posts attiva. Le routes errors restano esempi temporanei di test.
- Proxy locale verificato. La verifica complessiva del frontend e l'hosting restano nelle fasi successive.

### Preparazione frontend — Zod nel boilerplate Products

- L'utente aveva installato Zod in `client/` e lo aveva provato sul boilerplate Products; questi file di esempio sono stati rimossi durante la fase 9.
- Rimossi il validatore manuale condiviso, quello Products e `features/products/types.js` non utilizzato. Lo schema Zod documenta la forma dei dati a runtime; non fornisce da solo tipi statici per lo stato React in questo progetto JavaScript.
- Per le future feature, usare Zod soltanto per input/output delle richieste HTTP quando serve; niente schemi per lo stato della UI o infrastruttura generica di validazione. `client/src/features/stats/` è il primo esempio Class14: Axios su `/api/stats`, parsing Zod e stato di errore nella Home.

### Fase 8 completata — adattamento frontend

- `client/index.html`, favicon, `client/README.md`, Header, Footer e Home usano il brand Class14 e copy italiano. La fase 9 ha poi ridotto il menu a Argomenti, Progetti e Studenti e sostituito le pagine introduttive.
- Home presenta il Learning Hub e richiede i cinque contatori a `/api/stats`. La risposta è validata in `features/stats/schemas.js`; nessun dato numerico è fissato nel client.
- Verificati build e lint client, Home desktop e navigazione/menu in una viewport iPhone 16. Il server DB non era accessibile nella sandbox: verificato lo stato di errore dei contatori, non ancora la risposta HTTP riuscita in questa fase.
- Questa sezione registra lo stato verificato al termine della fase 8; lo stato attuale è descritto qui sotto.

### Fase 9 completata — pagine MVP

- Progetti: lista e dettaglio con Markdown sicuro (`react-markdown` e `skipHtml`), argomenti, studenti/repository, PDF e risorse. Argomenti: lista e dettaglio con progetti e materiali collegati indirettamente, deduplicati dall'API. Studenti: lista e profilo con avatar, GitHub, progetti e repository disponibili, compreso il caso senza repository.
- Cheat sheet e Risorse hanno cataloghi autonomi che riportano ai progetti; i PDF hanno apertura e download. Footer e Home aprono i cataloghi. L'header mostra solo Argomenti, Progetti e Studenti.
- Le risposte sono validate ai confini HTTP in `client/src/features/catalog/schemas.js`. Products, provider, route e chiamate Fake Store API sono rimossi. `client/vite.config.js` distingue la pagina `/cheatsheets` dai file `/cheatsheets/…`.
- Verificati con API e MySQL locali: contatori 15/15/124/18/17; percorso React → React Hello World → Emanuele con repository; liste principali; accesso diretto ai cataloghi; studente con zero repository; 404 progetto; PDF e avatar tramite Vite; dettaglio progetto a 390 px. Console browser senza errori o avvisi. Build, lint e formattazione client passati.
- La fase 10 aggiunge ricerca e filtri alle quattro liste; la fase 11 raccoglie le verifiche e la rifinitura finali.

### Fase 10 completata — ricerca e filtri essenziali

- `client/src/features/catalog/useCatalogFilters.js` legge e aggiorna soltanto `q` e `topic` nell'URL. Gli hook espliciti per risorsa passano i parametri agli endpoint esistenti e validano le risposte con gli schemi condivisi.
- `client/src/components/shared/CatalogFilters.jsx` riusa Input, Select e Button: ricerca su invio, filtro per argomento, conteggio risultati e reset. Le pagine distinguono catalogo vuoto da nessun risultato filtrato.
- Verificati via HTTP attraverso Vite: liste complete 15/15/18/17, combinazioni `q` + `topic` e nessun risultato per tutte e quattro le risorse. Build, lint e formattazione client passati.

### Fase 11 completata — rifinitura e consegna dell'MVP locale

- Verifiche visive e di accessibilità riferite dall'utente: navigazione incrociata, link esterni, avatar, PDF, accessi diretti, mobile, tastiera, focus, etichette, temi e buon punteggio Lighthouse. Non sono stati ripetuti test visivi automatizzati in questa fase.
- `npm run lint` e `npm run build` passano. La build emette un avviso sul bundle JavaScript da 516,62 kB; non impedisce la build.
- HTTP locali verificati per root API, stats, lista/dettaglio topics, liste filtrate di Projects/Students/Cheat Sheets/Resources, dettagli progetto/studente e 404 di un progetto inesistente. Server di verifica arrestato; nessun processo Vite avviato in questa fase.
- `README.md`, `client/README.md`, `docs/SETUP.md`, `docs/API-CONTRACT.md` e `docs/KANBAN.md` aggiornati. Deployment e pubblicazione della repository rimangono fuori dal ticket, in attesa della decisione dell'utente dopo il confronto con l'insegnante.
