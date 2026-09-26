# Class14 — guida per continuare il progetto

Ultimo aggiornamento del contesto: 26 settembre 2026. Questo file raccoglie le decisioni confermate e lo stato del lavoro per riprendere in una nuova chat. Verificare sempre i file e `git status` prima di intervenire: lo stato descritto può evolvere.

## Obiettivo e contesto

- L'utente è Emanuele Favero (`emanuelefavero` su GitHub), studente Boolean Web Development Part Time, classe **WDPT14**.
- Il corso base sta terminando. Questo è il progetto finale full stack, da mostrare ai recruiter, con tema scelto liberamente: un hub della classe per esplorare studenti, progetti svolti e materiali di ripasso.
- Il brand visibile è **Class14**. La cartella e la repository restano **webapp-express**: non rinominarle.
- L'utente ha inizializzato Git e pubblicato la repository, dichiarandola privata per ora. Non fare commit, push o cambi di visibilità senza richiesta.
- Il catalogo comprende i **15 progetti dal periodo React in poi**, inclusi i successivi esercizi Node, Express e database. Gli esercizi precedenti HTML/CSS/JavaScript restano fuori.
- Lavorare una fase alla volta. La priorità è una soluzione completa, leggibile e professionale, con tecniche appropriate al corso, senza architetture speculative.

## Organizzazione della documentazione

- `AGENTS.md` e `KANBAN.md` restano nella root.
- `docs/` contiene piano, inventario degli asset e `CODE-STYLE-GUIDELINES.md`; seguire anche le convenzioni raccolte qui.
- `docs/brief/` conserva il prompt e la traccia originali.
- I Markdown in `assets/` sono dati dell’app e restano accanto agli asset; il README SQL resta in `server/db/setup/`.
- I percorsi scritti nei documenti si riferiscono alla root del progetto, salvo i link Markdown relativi.

## Cosa leggere prima di lavorare

1. Questo file, [docs/CODE-STYLE-GUIDELINES.md](docs/CODE-STYLE-GUIDELINES.md) e [KANBAN.md](KANBAN.md).
2. [plan.md](docs/plan.md) per la visione e [assets-info.md](docs/assets-info.md) per i dati.
3. I file pertinenti alla fase corrente. Per il database: [server/db/setup/README.md](server/db/setup/README.md), [schema.sql](server/db/setup/schema.sql) e [scripts/generate-seed.mjs](scripts/generate-seed.mjs).

`docs/brief/PROMPT.md` contiene il brief iniziale; `docs/brief/EXERCISE.md` la traccia originale sui film. L'app è stata volutamente adattata a Class14: non reintrodurre film, recensioni o altre entità solo perché compaiono nella traccia.

Se disponibile, usare la skill locale `.agents/skills/boolean-course-exercises/SKILL.md`; `assets/lessons.json` è il riferimento del calendario. `.agents/` è ignorata da Git e potrebbe mancare in altri ambienti: le istruzioni essenziali sono in questo file.

Le decisioni esplicite dell'utente e questo riepilogo prevalgono sulle parti meno aggiornate di `docs/plan.md`. Il riferimento frontend principale è `react-context-api`. La precedente richiesta di usare esclusivamente Declarative Mode è superata: l’utente accetta Data Mode o Declarative Mode; la base copiata usa già Data Mode e può essere mantenuta.

## Decisioni tecniche confermate

### Backend

- Node.js, Express, ES Modules, JavaScript, `mysql2/promise`, `async/await` e pool MySQL.
- Organizzazione per risorsa: routes, controller, repository e schemas dove necessari. Zod per la validazione dei confini HTTP quando utile.
- Query parametrizzate; repository indipendenti da Express; middleware centralizzati per 404 ed errori.
- Credenziali e configurazione del database tramite variabili d'ambiente. Non fissare nel codice le credenziali usate durante le verifiche locali.
- Avatar e PDF verranno serviti da `server/public/` con percorsi `/avatars/...` e `/cheatsheets/...`.

### Frontend

- React con Vite, JavaScript senza TypeScript. React Compiler già configurato in `client/vite.config.js`; verificarne il funzionamento quando verranno installate le dipendenze.
- La base usa **React Router Data Mode** con `createBrowserRouter` in `client/src/router/router.jsx` e `RouterProvider` in `App.jsx`. Mantenerla per continuità salvo una ragione concreta per scegliere Declarative Mode: entrambe sono autorizzate. Non aggiungere loader/action solo perché disponibili.
- Conservare pagine in `src/pages/`, `RootLayout` con `Outlet` dentro `Main`, `Header` e `Footer`, e l’organizzazione del router già presente.
- Il frontend usa Axios e la validazione manuale in `client/src/lib/validation.js`, con validatori per feature. **Non introdurre Zod nel frontend adesso**; un’eventuale migrazione è futura. Zod è già presente nel backend e può continuare a essere usato lì.
- CSS nativo, CSS nesting, custom properties e tema automatico con `prefers-color-scheme`. Nessun Bootstrap o framework CSS. L'ispirazione shadcn/ui è visiva, non una richiesta di installarlo.
- Componenti separati in `components/ui`, `components/shared`, `components/layout`; CSS vicino ai componenti. Stato locale e props, Context solo per esigenze concrete.
- Export nominati, apici singoli, indentazione di 2 spazi, punto e virgola. Per ora niente JSDoc. Seguire le convenzioni qui raccolte e lo stile dei riferimenti locali.

### Riferimenti locali da consultare

- `/Users/emanuelefavero/code/boolean/express-blog-sql`: stile Express, repository SQL, validazione, middleware e organizzazione per risorsa.
- `/Users/emanuelefavero/code/boolean/react-context-api`: componenti, CSS e organizzazione React. In particolare `src/components/ui` e `src/components/shared` contengono componenti riutilizzabili dell'utente.
- Queste app sono ora copiate in `server/` e `client/`: usare soprattutto il codice presente nel progetto come riferimento. I componenti UI/shared, `cx`, le icone e il CSS sono già in `client/`; riutilizzarli dove pertinenti.
- Non leggere `node_modules`, build o cache dei riferimenti. Non copiare indiscriminatamente il router o l'intera applicazione.

## Stato attuale: app di riferimento copiate, conversione da iniziare

L’utente ha copiato `express-blog-sql` dentro `server/` e `react-context-api` dentro `client/`. Entrambi hanno struttura, `package.json` e lockfile; **npm install non è ancora stato eseguito** dall’utente. Non fare nuovo scaffolding e non considerare queste app già convertite o verificate per Class14.

- `server/app.js` registra ancora `posts`, `root` ed `errors`. `server/db/db.js` usa già il database `class14`, ma conserva host/utente della base e password da variabile d’ambiente. Le routes `posts` interrogano ancora il modello del blog e non sono feature di Class14.
- `server/package.json`, `server/README.md`, dati root, logo e altri contenuti conservano riferimenti al blog. Il README copiato non è la fonte per il setup del database: seguire `server/db/setup/README.md`.
- `server/test.http` contiene richieste per posts: sostituirle con richieste Class14 man mano che si implementano e verificano le nuove risorse.
- `client/src/features/products/`, `client/src/pages/products/`, i provider in `App.jsx`, router, Header e contenuti Home/AboutUs appartengono ancora al negozio di esempio/Fake Store API. Il package si chiama ancora `react-router`; titoli e interfaccia mostrano React Context API.
- Non cancellare preventivamente posts/products: sono esempi di stile da consultare durante la conversione. Rimuovere la vecchia feature e i relativi import, route, provider, richieste e contenuti quando la nuova feature che la sostituisce è pronta. Non lasciare riferimenti pendenti.
- L’ordine concordato è **prima server, poi client**, una modifica verificabile alla volta. Rinominare progressivamente package, titoli, documentazione e contenuti al brand Class14 nel sottoprogetto su cui si sta lavorando; non rinominare la repository.
- Esiste anche `server/AGENTS.md`, copiato dal riferimento: leggerlo per modifiche al server. Cita `.agents/CODE-STYLE-GUIDELINES.md`; le linee guida generali disponibili nella root del progetto sono ora `docs/CODE-STYLE-GUIDELINES.md`. Tenere presente questo riferimento da riallineare durante la conversione.
- È stata rilevata anche una cartella aggiuntiva `express-blog-sql/` nella root. Non è il backend attivo, che è `server/`; non rimuoverla o modificarla senza verificarne lo scopo con l’utente.

Il database locale **class14** è stato creato e popolato dall'utente. Successivamente sono stati applicati e verificati anche i collegamenti ai PDF e le risorse esterne.

| Tabella | Righe verificate |
| --- | ---: |
| `students` | 15 |
| `projects` | 15 |
| `cheatsheets` | 18 |
| `resources` | 17 |
| `student_projects` | 124 |
| `project_cheatsheets` | 39 |
| `project_resources` | 54 |

- Tutti i 15 progetti hanno almeno un PDF e una risorsa; tutti i 18 PDF e le 17 risorse sono collegati.
- Le tre tabelle ponte hanno chiavi primarie composte e foreign key con `ON DELETE CASCADE`.
- `projects.topics` è attualmente una stringa di tag separati da virgola; non è una relazione normalizzata. Non cambiarla implicitamente durante l'implementazione delle API.
- `students.github_username`, `projects.slug`, `cheatsheets.slug` e `resources.url` sono chiavi naturali uniche. Le associazioni SQL cercano gli ID tramite queste chiavi: non dipendono da ID numerici fissi.
- Le descrizioni dei progetti sono Markdown salvato nel database. Quando verranno renderizzate, scegliere una soluzione che gestisca il Markdown senza eseguire HTML non attendibile.

## Asset e loro significato

- `assets/students.js`: 15 studenti, solo nome di battesimo e username GitHub. I nomi sono unici nella classe attuale, ma l'identità è lo username/ID, non il nome. I profili pubblici e gli avatar sono inclusi per scelta dell'utente.
- `assets/projects.js`: 15 slug esatti delle repository previste e relativi tag. `react-hello-world` è incluso. Non ampliare il catalogo ai progetti precedenti senza richiesta.
- `assets/project-descriptions/`: una descrizione Markdown per ciascun progetto, con un solo titolo principale. Gli allegati degli esercizi citati nelle descrizioni non sono inclusi; è una scelta intenzionale.
- `assets/avatars/` e `assets/student-avatars.json`: 15 immagini locali e mappatura username/percorso. Non è necessario riscaricarle per iniziare il backend.
- `assets/student-projects.json`: 124 coppie studente/progetto con URL pubblico verificato su 225 candidati. Uno studente può avere poche o nessuna repository del catalogo.
- `assets/github-sync-status.json`: checkpoint delle verifiche. Gli altri 101 candidati non hanno una corrispondenza pubblica esatta; ciò non dimostra che lo studente non abbia fatto l'esercizio.
- `assets/cheatsheets/`: 18 PDF. `assets/project-cheatsheets.js` contiene 39 associazioni curate in base ai contenuti dei progetti; il solo tag React sarebbe troppo generico.
- `assets/resources.md`: URL e titoli esterni per argomento. Il seed importa solo le sezioni con tag presenti nel catalogo: mysql2, MySQL, Database, Express, Node.js, NPM e React. Esclude HTML, CSS, JavaScript e Bootstrap. React Router è collegato solo a `react-router`; gli altri link seguono i tag.
- I link esterni sono stati copiati senza visitarli, come richiesto. Non aggiornarli o sostituirli automaticamente.

## Script e database: come continuare senza perdere dati

```bash
# Genera il seed completo e i due SQL incrementali dagli asset
node scripts/generate-seed.mjs

# Verifica che gli SQL generati siano aggiornati
node scripts/generate-seed.mjs --check

# Riprende solo le verifiche GitHub incomplete o fallite
node scripts/sync-github-assets.mjs

# Ricontrolla tutti i profili e URL (solo se serve aggiornare il catalogo)
node scripts/sync-github-assets.mjs --refresh
```

- Modificare i dati sorgente o il generatore, poi rigenerare: non modificare a mano `seed.sql`, `project-cheatsheets.sql` o `project-resources.sql`.
- Il seed completo contiene già PDF, risorse e associazioni. Gli SQL incrementali servono per aggiornare una vecchia installazione senza reimportare tutto.
- Il seed aggiorna righe con la stessa chiave naturale e aggiunge associazioni senza duplicarle. **Non rimuove** record o associazioni diventati obsoleti: una futura sincronizzazione con cancellazioni richiede una decisione esplicita.
- Non rileggere tutto `seed.sql` per capire il progetto: è un file generato lungo. Leggere prima il generatore, lo schema e gli asset pertinenti.
- Il database è già popolato: non ricrearlo, svuotarlo o rieseguire import senza una ragione concreta. Le istruzioni per una nuova installazione sono nel README del setup SQL.
- In questa sessione MySQL era raggiungibile con il client locale e accesso fuori dalla sandbox; nella sandbox i messaggi di connessione fallivano. Verificare il contesto prima di diagnosticare il database come spento. Una vecchia prova con un server temporaneo era andata in crash, ma il database reale è poi stato verificato con successo.

## GitHub e segreti

- `.env` contiene un `GITHUB_TOKEN` locale, verificato valido durante la sessione. Non leggerne o stamparne il valore. È ignorato da Git e non serve all'app per mostrare i dati già raccolti.
- Il token fine-grained è stato rimosso da `.env` dall'utente; esiste ancora sul suo account per un altro progetto. Ignorarlo: non revocarlo, cercarlo o riutilizzarlo.
- Lo script attuale usa richieste anonime: API GitHub per gli avatar e controlli HTTP sugli URL pubblici esatti delle repository. Non usa il token né `gh` per enumerare repository.
- Regola confermata: costruire esclusivamente `https://github.com/{username}/{projectSlug}`. Non cercare nomi simili o altre repository nei profili. Un redirect verso un nome diverso non è una corrispondenza valida.
- Una precedente scansione autenticata con il token ampio di `gh` è stata respinta dalla revisione automatica perché poteva leggere dati privati. Il lavoro è stato completato con controlli pubblici anonimi. Non usare questo episodio come motivo per richiedere nuovi token per il catalogo attuale.

## Prossimi passi, in ordine

### 1. Backend Express: prossima fase concreta

- Adattare il progetto già presente in `server/`: rivedere package, branding, configurazione e contenuti iniziali. Installare/verificare le dipendenze quando si avvia la fase di implementazione, non durante un semplice aggiornamento di contesto.
- Configurare variabili d'ambiente e pool MySQL; adattare `server/.env.example` già presente senza segreti e verificare il controllo della connessione all'avvio già implementato.
- Preparare i file statici dai sorgenti in `assets/`, mantenendo funzionanti i percorsi già salvati nel database.
- Implementare lista e dettaglio di progetti e studenti. Il dettaglio progetto deve poter fornire studenti/repository, PDF e risorse; il dettaglio studente i suoi progetti pubblici.
- Definire e documentare endpoint e forma delle risposte prima di collegare React. Percorsi, filtri, paginazione e struttura JSON non sono ancora stati concordati: scegliere una soluzione minima coerente con i dati, senza presentarla come decisione già presa.
- Verificare validazione, 404, errori, studenti senza repository, relazioni e accesso ai file statici con richieste HTTP mirate.

### 2. Frontend React

- Dopo il backend, adattare il client già copiato da `react-context-api`: branding e configurazione, poi nuove feature/pagine e sostituzione graduale di products. Conservare UI/layout e validazione corrente, mantenendo il router Data Mode esistente salvo scelta motivata diversa.
- Costruire pagine per esplorare progetti, studenti e materiali, con liste e dettagli e stati di caricamento, errore e dati assenti.
- La composizione visiva, la lingua definitiva dell'interfaccia e l'organizzazione di eventuali pagine dedicate agli argomenti non sono ancora definite: concordarle nella fase frontend.
- Curare accessibilità, mobile, tema chiaro/scuro e rendering delle descrizioni Markdown.

### 3. Completamento e presentazione

- Verificare i flussi completi, aggiornare documentazione di avvio e API, preparare README del progetto e configurazione senza segreti.
- Deployment, hosting e passaggio della repository a pubblica non sono stati decisi. Non pubblicare o cambiare visibilità autonomamente.
- Contatori di commit e una possibile top 5 sono idee future, non requisiti della prima versione. Non aggiungere autenticazione, CRUD amministrativo, recensioni o classifiche senza definirne prima lo scopo con l'utente.

## Regole operative per gli agenti

- Rispondere normalmente in italiano. Preservare modifiche dell'utente e controllare il diff prima e dopo ogni fase.
- Aggiornare `KANBAN.md` e i documenti pertinenti quando una fase è verificata; aggiornare questo file quando cambia una decisione importante.
- Evitare letture massive di SQL generato, PDF e dati di checkpoint quando bastano sorgenti piccoli.
- Verificare il lavoro con i controlli pertinenti e riportare separatamente ciò che è stato implementato e ciò che non è stato verificato.
- Non trasformare automaticamente un suggerimento futuro in un requisito. Proseguire una fase alla volta, mantenendo la continuità con il codice dell'utente.
