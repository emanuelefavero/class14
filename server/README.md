# Class14 — backend Express

Backend del Learning Hub e Student Showcase della classe Boolean WDPT14.
Node.js, Express, JavaScript ESM, mysql2/promise e Zod per la validazione.

Questa repository contiene il backend pubblicato da `server/` del monorepo
[class14](https://github.com/emanuelefavero/class14). Il frontend si trova in
[webapp-react](https://github.com/emanuelefavero/webapp-react). Lo sviluppo
principale avviene nel monorepo; questa repository viene aggiornata tramite Git
subtree e non deve ricevere modifiche dirette.

## Diagramma ER del DB

![ER Diagram](./er-diagram.png 'ER Diagram')

## Stato

Configurazione e avvio sono adattati a Class14. `GET /` restituisce il brand e lo stato della conversione.
Le API Projects, Students, Cheat Sheets, Resources, Topics e Stats sono implementate secondo il [contratto](https://github.com/emanuelefavero/class14/blob/main/docs/API-CONTRACT.md):

- `GET /api/projects`: lista ordinata, ricerca `q` su titolo/slug e filtro `topic` sul tag intero.
- `GET /api/projects/:slug`: descrizione Markdown, studenti con repository, PDF e risorse collegati.

- `GET /api/students`: elenco con nome, username, GitHub e avatar; ricerca q e filtro topic.
- `GET /api/students/:github_username`: profilo con repository del catalogo, conteggio e topics derivati.
- `GET /api/cheatsheets`: catalogo PDF con tutti i progetti collegati; ricerca su titolo/slug e filtro topic indiretto.
- `GET /api/resources`: catalogo link con tutti i progetti collegati; ricerca sul titolo e filtro topic indiretto.
- `POST /api/resources`: crea una risorsa e la associa a uno o più progetti in
  una transazione; richiede la chiave amministratore e restituisce lo stesso
  oggetto del catalogo con status 201.
- `DELETE /api/resources/:id`: elimina una risorsa; le associazioni vengono
  rimosse in cascata, richiede la chiave amministratore e il successo restituisce
  204 senza body.

- `GET /api/topics`: tag unici con conteggio dei progetti.
- `GET /api/topics/:name`: progetti e materiali indiretti, deduplicati.
- `GET /api/stats`: cinque conteggi globali del catalogo.

Topics riutilizza i repository esistenti; Stats esegue una query con cinque COUNT indipendenti. Nessun JSON duplicato o modifica allo schema. Verificati tutti i 7 topics; il database locale contiene 15 studenti, 15 progetti, 124 repository, 18 PDF e 18 risorse, mentre il seed conserva le 17 risorse iniziali.

La feature posts è stata rimossa; le routes di prova errors restano per i controlli dei middleware.

## Organizzazione del codice

I controller di lista importano direttamente `catalogQuerySchema` da `schemas/querySchemas.js`.
La validazione riguarda i filtri utilizzati; nei dettagli si valida il parametro dinamico e si ignorano le query aggiuntive.

I cataloghi materiali usano LEFT JOIN con le tabelle ponte, conservando gli elementi senza progetti.
Il filtro topic degli studenti usa un JOIN con DISTINCT. I riepiloghi Projects sono riutilizzati per mantenere coerenti topics e ordinamento.
I metodi repository hanno JSDoc descrittivi senza annotazioni di typing; i commenti interni spiegano i passaggi di associazione.
La creazione Resources valida titolo, URL HTTP/HTTPS e ID distinti dei progetti;
la transazione evita risorse o associazioni parziali. Un progetto assente produce
404 e un URL già presente 409.
La cancellazione valida l'ID, restituisce 404 per una risorsa assente e si affida
alla foreign key `ON DELETE CASCADE` per le righe ponte.

## Configurazione locale

Richiede Node.js 24.14 o successivo e MySQL con il database `class14` già popolato.
Per una nuova installazione consultare il [setup SQL](db/setup/README.md); non ricreare o reimportare il database locale esistente.

Dalla root della repository backend:

```bash
npm ci
cp .env.example .env
```

Se `.env` esiste già, modificarlo senza sovrascriverlo. Impostare utente/password MySQL locali; `.env` è ignorato da Git.

Per creare e popolare il database su una nuova installazione:

```bash
mysql -u root -p < db/setup/schema.sql
mysql -u root -p < db/setup/seed.sql
```

| Variabile           | Default / requisito                                             |
| ------------------- | --------------------------------------------------------------- |
| ADMIN_KEY           | Obbligatoria; chiave condivisa per le operazioni di scrittura   |
| PORT                | 3000; intero 1–65535                                            |
| DB_HOST             | localhost; stringa non vuota                                    |
| DB_PORT             | 3306; intero 1–65535                                            |
| DB_USER             | Obbligatoria; utente MySQL locale, senza default nel codice     |
| DB_PASSWORD         | Stringa vuota se il proprio utente locale non richiede password |
| DB_NAME             | class14; stringa non vuota                                      |
| DB_CONNECTION_LIMIT | 10; intero 1–100                                                |
| DB_CONNECT_TIMEOUT  | 10000 millisecondi; intero 1–60000                              |

Gli script caricano `.env` se presente. Le variabili esportate nel terminale hanno precedenza. Il token GitHub non è utilizzato dal backend.

`ADMIN_KEY` non ha un default nel codice. POST e DELETE Resources richiedono
`Authorization: Bearer <ADMIN_KEY>`; i GET restano pubblici. Il valore di
esempio va sostituito con una chiave non prevedibile prima di pubblicare l'app.

## Avvio

Dalla root della repository backend:

```bash
npm run dev
```

`npm start` avvia il server senza watch. Nel monorepo sono disponibili anche
`npm run dev:server` per il solo backend e `npm run dev` per avviare entrambe le
applicazioni.

La configurazione viene validata prima di creare il pool. Il server esegue `SELECT 1` prima di ascoltare sulla porta configurata.
In caso di configurazione non valida o connessione fallita termina con codice non zero; i log non stampano credenziali né l’oggetto di configurazione.
Un errore di ascolto (per esempio porta occupata) chiude il pool e segnala un codice di errore.

```bash
curl http://localhost:3000/
```

`test.http` contiene richieste Projects, Students, Cheat Sheets e Resources
ripetibili, inclusi il ciclo POST → DELETE e i casi 400/404/409. La verifica dei GET
ha confrontato tutte le relazioni dei 15 dettagli con il database: 124
repository, 39 associazioni PDF e 54 risorse, senza duplicati. Verificati anche
tutti i 15 profili (3 senza repository), i 18 PDF e le 17 risorse, i filtri
combinati e le associazioni inverse. La POST è stata verificata creando una
risorsa temporanea collegata a due progetti: risposta 201 e catalogo coerenti,
nessuna scrittura nei casi non validi. La riga temporanea è stata eliminata e il
conteggio è tornato a 17. Avatar/PDF sono in `public/`; verificato un file per
tipo e file assenti 404, anche attraverso il proxy Vite. Verificati errori
400/404/409/500 senza dettagli interni. Vedere il
[collegamento client–server](https://github.com/emanuelefavero/class14/blob/main/docs/SETUP.md#collegamento-clientserver).

## Riferimenti

- [Setup completo](https://github.com/emanuelefavero/class14/blob/main/docs/SETUP.md): avvio coordinato di server e client.
- [Contratto API](https://github.com/emanuelefavero/class14/blob/main/docs/API-CONTRACT.md): endpoint e forme delle risposte.
- [Linee guida](https://github.com/emanuelefavero/class14/blob/main/docs/CODE-STYLE-GUIDELINES.md): stile del progetto.
- [Contesto](https://github.com/emanuelefavero/class14/blob/main/AGENTS.md): dati, asset e limiti dell'MVP.
