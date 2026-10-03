# Class14 — Contratto API MVP

## Stato e perimetro

Contratto definito il 26 settembre 2026 per implementare l’MVP concordato in
[AGENTS.md](../AGENTS.md) e [KANBAN.md](KANBAN.md), secondo la direzione
[PLAN.md](PLAN.md). **Questo documento è la specifica di riferimento: Projects,
Students, Cheat Sheets/Resources, Topics e Stats sono implementati e usati dal
client; creazione e cancellazione Resources sono implementate nel backend e
precedono il form.**

L'API è principalmente di lettura e aggiunge creazione e cancellazione mirate
per le risorse. Non include autenticazione, CRUD completo o chiamate GitHub live.
Riutilizza le sette tabelle di [schema.sql](../server/db/setup/schema.sql), senza
migrazioni. La scrittura è destinata per ora allo sviluppo locale; la protezione
in deployment verrà decisa in futuro. Le vecchie routes posts non fanno parte
del contratto.

## Convenzioni comuni

- Base path `/api`; origine locale prevista `http://localhost:3000`.
- Tutti gli endpoint sotto `/api` restituiscono JSON con `Content-Type: application/json`.
- Successo: GET `200`, POST `201`, DELETE `204` senza body. Liste e dettagli
  usano JSON diretto, senza envelope `data` o `meta`.
- Nomi JSON in `snake_case`, coerenti con il database; `topics` è sempre un array di stringhe, mai la stringa SQL separata da virgole.
- ID SQL come numeri interi positivi. Identificatori di navigazione: slug progetto, username studente, slug PDF; risorse identificate dal loro ID SQL perché non hanno slug.
- Nessuna paginazione per il piccolo catalogo attuale. Tutti i risultati filtrati sono restituiti; non troncarli silenziosamente. Parametri page/limit/sort non sono supportati.
- Gli array vuoti sono `[]`, mai `null`; campi nullable sono presenti con `null`. Non omettere campi perché manca il dato.
- I dettagli includono collezioni correlate senza annidamento ricorsivo. Gli oggetti riepilogativi definiti sotto hanno sempre gli stessi campi.
- `created_at` non viene esposto nell’MVP: è una data di inserimento, non una data didattica o di completamento.
- Ordinamento fisso crescente, confronto testuale case insensitive (`localeCompare` con locale `en` e sensitivity `base`); a parità, identificatore univoco crescente. Per i tag: a parità usare confronto della stringa originale per rendere l’ordine deterministico.
- Le descrizioni sono Markdown come stringa; il frontend deve renderizzarle senza eseguire HTML non attendibile.

## Endpoint

| Metodo | Percorso                         | Risposta                    | Query ammesse |
| ------ | -------------------------------- | --------------------------- | ------------- |
| GET    | `/api/projects`                  | Array ProjectSummary        | `q`, `topic`  |
| GET    | `/api/projects/:slug`            | ProjectDetail               | Ignorate      |
| GET    | `/api/students`                  | Array StudentSummary        | `q`, `topic`  |
| GET    | `/api/students/:github_username` | StudentDetail               | Ignorate      |
| GET    | `/api/cheatsheets`               | Array CheatSheetCatalogItem | `q`, `topic`  |
| GET    | `/api/resources`                 | Array ResourceCatalogItem   | `q`, `topic`  |
| POST   | `/api/resources`                 | ResourceCatalogItem         | Ignorate      |
| DELETE | `/api/resources/:id`             | Nessun body                 | Ignorate      |
| GET    | `/api/topics`                    | Array TopicSummary          | Ignorate      |
| GET    | `/api/topics/:name`              | TopicDetail                 | Ignorate      |
| GET    | `/api/stats`                     | CatalogStats                | Ignorate      |

Non servono endpoint di dettaglio autonomi per PDF e risorse nella prima versione:
i cataloghi contengono i progetti collegati; il PDF si apre dal file_path e la
risorsa dall’URL esterno. Nessun endpoint di dettaglio numerico alternativo.

## Identificatori e query

### Parametri di percorso

- Slug progetto/PDF: stringa di 1–150 caratteri, lettere ASCII, numeri e trattini. L’identificatore di percorso progetto viene risolto senza distinguere maiuscole/minuscole; la risposta conserva lo slug nel DB.
- Username: 1–100 caratteri, lettere ASCII, numeri e trattini; lookup case insensitive, risposta con grafia salvata. Non usare il primo nome come identità.
- Topic `:name`: tag originale codificato con `encodeURIComponent`, non uno slug generato. Per esempio `/api/topics/Node.js` e `/api/topics/MySQL`. Lunghezza 1–255 caratteri dopo trim; nessuna virgola o carattere di controllo. Confronto case insensitive su tag intero.
- ID Resource: intero positivo nel percorso `/api/resources/:id`. Valori non
  numerici, zero o negativi restituiscono 400.
- La decodifica URL avviene una volta nel framework; una codifica percentuale non valida restituisce 400.
- Percorso sintatticamente valido ma entità assente: 404. Per i percorsi sconosciuti sotto `/api`, 404.

### Ricerca e filtri

- `q`: singola stringa, trim, massimo 150 caratteri. Vuota dopo trim significa nessuna ricerca.
- Ricerca per sottostringa letterale case insensitive; `%` e `_` sono caratteri ordinari, non wildcard. Se si usa SQL LIKE, occorre gestirne l’escaping oltre alla parametrizzazione.
- Projects: `q` cerca in title o slug. Students: name o github_username. Cheat Sheets: title o slug. Resources: title (non URL).
- `topic`: singola stringa, trim, 1–255 caratteri, nessuna virgola/carattere di controllo; vuota dopo trim significa nessun filtro. Match case insensitive sull’intero tag, non per sottostringa.
- Projects: include progetti con quel tag. Students: include studenti con almeno una repository del catalogo associata a un progetto con quel tag.
- Cheat Sheets/Resources: include materiali collegati ad almeno un progetto con quel tag; il collegamento al topic è indiretto. I projects restituiti in ciascun elemento restano **tutti** i suoi progetti collegati, non soltanto quelli del filtro.
- `q` e `topic` si combinano con AND. Topic valido ma non presente nel catalogo restituisce lista `[]` con 200, mentre `/api/topics/:name` restituisce 404.
- Sulle liste, chiavi sconosciute, parametri ripetuti, array/oggetti query e caratteri di controllo in q restituiscono 400. I dettagli Projects e Students ignorano le query perché non le utilizzano; validano solo il parametro dinamico. Gli endpoint Topics e Stats ignorano le query inutilizzate, senza schemi vuoti o controlli aggiuntivi.
- Esempi: `/api/projects?q=react&topic=React`, `/api/students?topic=MySQL`, `/api/resources?topic=Node.js`.

## Forme JSON e provenienza dei campi

I nomi seguenti descrivono forme di oggetti; non richiedono TypeScript o JSDoc.

### ProjectSummary

| Campo  | Forma          | Fonte                       |
| ------ | -------------- | --------------------------- |
| id     | numero         | projects.id                 |
| slug   | stringa        | projects.slug               |
| title  | stringa        | projects.title              |
| topics | array stringhe | projects.topics trasformato |

Ordine lista progetti: title, poi slug. Questo riepilogo si usa anche nei cataloghi materiali e nelle relazioni.

### StudentSummary

| Campo           | Forma           | Fonte                                   |
| --------------- | --------------- | --------------------------------------- |
| id              | numero          | students.id                             |
| name            | stringa         | students.name                           |
| github_username | stringa         | students.github_username                |
| github_url      | URL assoluto    | `https://github.com/` + github_username |
| avatar_path     | percorso o null | students.avatar_path                    |

Ordine studenti: name, poi github_username. Gli URL GitHub conservano la grafia dello username.

### CheatSheetSummary

| Campo     | Forma    | Fonte                 |
| --------- | -------- | --------------------- |
| id        | numero   | cheatsheets.id        |
| slug      | stringa  | cheatsheets.slug      |
| title     | stringa  | cheatsheets.title     |
| file_path | percorso | cheatsheets.file_path |

Ordine PDF: title, poi slug. Nessuna descrizione, categoria o data di pubblicazione inventata.

### ResourceSummary

| Campo | Forma        | Fonte           |
| ----- | ------------ | --------------- |
| id    | numero       | resources.id    |
| title | stringa      | resources.title |
| url   | URL assoluto | resources.url   |

Ordine risorse: title, poi id. Conservare gli URL salvati; nessun aggiornamento automatico.

### ProjectDetail

Tutti i campi ProjectSummary, più:

| Campo       | Forma                                              | Fonte                                |
| ----------- | -------------------------------------------------- | ------------------------------------ |
| description | Markdown o null                                    | projects.description                 |
| students    | array StudentSummary con campo aggiuntivo repo_url | student_projects JOIN students       |
| cheatsheets | array CheatSheetSummary                            | project_cheatsheets JOIN cheatsheets |
| resources   | array ResourceSummary                              | project_resources JOIN resources     |

repo_url è il valore verificato di student_projects.repo_url, non una repository simile cercata live.
Le collezioni sono deduplicate per ID e ordinate con le regole dei rispettivi riepiloghi.

### StudentDetail

Tutti i campi StudentSummary, più:

| Campo            | Forma                                              | Fonte                              |
| ---------------- | -------------------------------------------------- | ---------------------------------- |
| projects         | array ProjectSummary con campo aggiuntivo repo_url | student_projects JOIN projects     |
| repository_count | numero                                             | lunghezza projects                 |
| topics           | array stringhe                                     | unione dei topics di quei projects |

I projects sono ordinati come ProjectSummary. Studente senza repository: projects `[]`, repository_count `0`, topics `[]`, sempre 200.
La lista `/api/students` restituisce solo StudentSummary: i campi aggregati appartengono al dettaglio.

### Cataloghi materiali

- CheatSheetCatalogItem = CheatSheetSummary + `projects` (array ProjectSummary).
- ResourceCatalogItem = ResourceSummary + `projects` (array ProjectSummary).
- Cataloghi includono anche eventuali record senza collegamenti, con projects `[]`; il filtro topic li esclude.
- Deduplicare projects per ID e rispettare l’ordinamento ProjectSummary.

### Creazione Resource

`POST /api/resources` accetta JSON con questa forma:

```json
{
  "title": "React documentation",
  "url": "https://react.dev/",
  "project_ids": [1, 3, 8]
}
```

- Il body è un oggetto stretto: campi sconosciuti, mancanti o di tipo errato
  restituiscono 400.
- `title` applica trim e deve contenere 1–150 caratteri.
- `url` applica trim, deve contenere al massimo 255 caratteri ed essere un URL
  assoluto con protocollo HTTP o HTTPS.
- `project_ids` deve essere un array non vuoto di interi positivi distinti.
- Tutti i progetti devono esistere; almeno un ID assente restituisce 404 e non
  crea alcuna riga.
- Un URL già presente restituisce 409 e non aggiunge associazioni implicitamente.
- Risorsa e righe di `project_resources` vengono inserite nella stessa
  transazione. Un errore non lascia scritture parziali.
- Il successo restituisce 201 e un ResourceCatalogItem. I progetti sono completi
  di topics canonici e ordinati come nelle risposte GET.

### Cancellazione Resource

`DELETE /api/resources/:id` elimina la risorsa identificata dal suo ID SQL.

- Un ID non valido restituisce 400.
- Una risorsa inesistente restituisce 404.
- Il successo restituisce 204 senza body.
- La query elimina soltanto la riga `resources`; le associazioni in
  `project_resources` vengono rimosse dalla foreign key `ON DELETE CASCADE`.
- Non serve una transazione applicativa: la cancellazione e la cascata sono una
  singola operazione del database.

### TopicSummary e TopicDetail

Non esiste una tabella topics. La trasformazione comune separa projects.topics sulla virgola, applica trim, elimina stringhe vuote e deduplica case insensitive. NULL/vuoto produce `[]`.
Per eventuali grafie equivalenti, scegliere quella del primo progetto in ordine di id e della prima occorrenza nella stringa; usare questa grafia canonica ovunque. I tag sono ordinati per nome.

TopicSummary contiene soltanto:

| Campo         | Forma            | Fonte                        |
| ------------- | ---------------- | ---------------------------- |
| name          | stringa canonica | tag derivato                 |
| project_count | numero           | progetti distinti con il tag |

TopicDetail contiene name e project_count, più:

| Campo               | Forma                   | Fonte                           |
| ------------------- | ----------------------- | ------------------------------- |
| projects            | array ProjectSummary    | progetti con il tag             |
| related_cheatsheets | array CheatSheetSummary | PDF dei progetti con il tag     |
| related_resources   | array ResourceSummary   | risorse dei progetti con il tag |

project*count corrisponde alla lunghezza projects. Materiali deduplicati per ID anche quando più progetti li condividono; collezioni ordinate come i riepiloghi.
Il nome `related*\*` indica la relazione indiretta. L’interfaccia li presenta come **“Materiali dei progetti collegati”**. Nessuna descrizione del topic richiesta nell’MVP.

### CatalogStats

Oggetto di soli conteggi globali, non influenzati dai filtri delle liste:

```json
{
  "students_count": 15,
  "projects_count": 15,
  "repositories_count": 124,
  "cheatsheets_count": 18,
  "resources_count": 17
}
```

I numeri sono l’ultima verifica documentata, non costanti da codificare. Calcolare COUNT delle rispettive tabelle: students, projects, student_projects, cheatsheets, resources. Non contare righe moltiplicate da join.
Catalogo vuoto: tutti zero. Nessuna percentuale di completamento, numero totale dei repository GitHub o commit.

## URL statici e GitHub

- avatar_path e file_path sono percorsi relativi all’origine del backend con slash iniziale, ad esempio `/avatars/emanuelefavero.jpg` e `/cheatsheets/<nome-file-salvato>.pdf`.
- Conservare basename, estensione e maiuscole del percorso SQL. Il generatore salva già lo slash iniziale: non duplicarlo. Non esporre percorsi filesystem assoluti o la directory `assets/`.
- Il client risolve questi percorsi rispetto all’origine backend configurata; con proxy, occorre inoltrare anche `/avatars` e `/cheatsheets`, non solo `/api`. In locale Vite inoltra tutti e tre i prefissi a Express: usare URL relativi, senza CORS aggiuntivo. La configurazione hosting resta da definire.
- Un avatar assente è null e usa un fallback frontend. Un PDF mancante resta un errore del file statico: non restituire un file HTML come risposta riuscita.
- Apertura/visualizzazione/download del PDF usa lo stesso file_path. Il comportamento download va verificato nella fase statici/frontend, senza un secondo endpoint JSON.
- I file statici non restituiscono JSON: sono esterni al prefisso `/api`. PDF serviti come application/pdf, avatar con il tipo immagine pertinente.
- github_url è derivato; repo_url è letto dalla relazione verificata. Nessuna enumerazione profili o token necessario a queste risposte.

## Errori

Conservare la forma semplice del middleware esistente:

```json
{
  "message": "Project not found"
}
```

| Status | Condizione                                           | Message                       |
| ------ | ---------------------------------------------------- | ----------------------------- |
| 400    | Parametro/query/URL non valido                       | `Invalid request parameters`  |
| 404    | Progetto assente                                     | `Project not found`           |
| 404    | Studente assente                                     | `Student not found`           |
| 404    | Topic assente                                        | `Topic not found`             |
| 404    | Progetto indicato nella creazione Resource assente   | `Project not found`           |
| 404    | Resource da eliminare assente                        | `Resource not found`          |
| 404    | Percorso API non registrato                          | `Not Found`                   |
| 409    | URL Resource già presente                            | `Resource URL already exists` |
| 500    | Errore inatteso o database non disponibile a runtime | `Internal Server Error`       |

Nessun errore per una lista vuota o una relazione vuota. Non restituire SQL, stack, credenziali o messaggi interni al client; dettagli server solo nei log.
Il messaggio è descrittivo: il frontend sceglie il comportamento usando lo status, non confrontando il testo. Se il controllo DB fallisce all’avvio, il server non ascolta e termina con codice non zero: non può produrre una risposta HTTP 500.

## Limiti semantici

- Una repository pubblica verificata non prova il completamento dell’esercizio; repository non trovata non prova che non sia stato svolto.
- repository_count riguarda il catalogo Class14, non tutte le repository del profilo.
- I topics di StudentDetail descrivono gli argomenti dei progetti associati, non certificazioni delle competenze o linguaggi rilevati da GitHub.
- Non esporre created_at come completed_at o data della lezione; non esistono completamento reale, bio, immagine progetto, progetto finale o statistiche commit nello schema attuale.
- Nessun materiale diventa direttamente associato a un topic soltanto perché è collegato a uno dei suoi progetti.

## Criteri di verifica dell'implementazione

I criteri seguenti hanno guidato le verifiche delle fasi backend e frontend. Il 29 settembre 2026 sono stati ripetuti pochi controlli HTTP dei flussi principali: liste filtrate, dettagli, contatori e 404. Le verifiche più estese dei dati e delle relazioni sono documentate in [KANBAN.md](KANBAN.md). Il deployment resta da definire.

- Liste/dettagli rispettano esattamente i campi, nullabilità e ordinamenti descritti; gli ID derivano dal DB, non dai numeri di esempio.
- Progetto con più studenti/PDF/risorse non moltiplica gli oggetti per effetto dei join.
- Studente senza repository restituisce 200 e le tre aggregazioni vuote/zero.
- Cataloghi materiali e dettagli progetto concordano sulle associazioni; materiali senza progetti sono consultabili nel catalogo.
- Topic derivato ha project_count corretto e materiali senza duplicati; grafia/trim sono coerenti con topics nelle altre risposte.
- q usa ricerca letterale, topic match esatto, combinazione AND; filtro inesistente produce 200 con [], dettaglio inesistente 404.
- Query di lista ripetute, strutturate, sconosciute o troppo lunghe e URL di percorso malformati producono 400. Query aggiuntive nei dettagli Projects/Students non modificano risposta o status.
- Contatori corrispondono alle cinque tabelle; nessuna moltiplicazione dovuta a join o filtro della pagina.
- File statici e URL funzionano con la configurazione di integrazione scelta, senza esporre percorsi interni.
- 404/409/500 rispettano la forma comune e non espongono dati interni. Le vecchie routes posts vengono rimosse nella fase Projects.
- La creazione Resource restituisce la stessa forma del catalogo, rifiuta URL
  duplicati e progetti assenti e non lascia righe parziali in caso di errore.
- La cancellazione Resource restituisce 204, 404 se ripetuta e rimuove in
  cascata tutte le associazioni della risorsa.
