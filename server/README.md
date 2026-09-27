# Class14 — backend Express

Backend del Learning Hub e Student Showcase della classe Boolean WDPT14.
Node.js, Express, JavaScript ESM, mysql2/promise e Zod per la validazione.

## Stato

Configurazione e avvio sono adattati a Class14. `GET /` restituisce il brand e lo stato della conversione.
Le API Projects, Students, Cheat Sheets e Resources sono implementate secondo il [contratto](../docs/API-CONTRACT.md):

- `GET /api/projects`: lista ordinata, ricerca `q` su titolo/slug e filtro `topic` sul tag intero.
- `GET /api/projects/:slug`: descrizione Markdown, studenti con repository, PDF e risorse collegati.

- `GET /api/students`: elenco con nome, username, GitHub e avatar; ricerca q e filtro topic.
- `GET /api/students/:github_username`: profilo con repository del catalogo, conteggio e topics derivati.
- `GET /api/cheatsheets`: catalogo PDF con tutti i progetti collegati; ricerca su titolo/slug e filtro topic indiretto.
- `GET /api/resources`: catalogo link con tutti i progetti collegati; ricerca sul titolo e filtro topic indiretto.

Topics e Stats restano da implementare. La feature posts è stata rimossa; le routes di prova errors restano per i controlli dei middleware.

## Organizzazione del codice

I controller di lista importano direttamente `catalogQuerySchema` da `schemas/querySchemas.js`.
La validazione riguarda i filtri utilizzati; nei dettagli si valida il parametro dinamico e si ignorano le query aggiuntive.

I cataloghi materiali usano LEFT JOIN con le tabelle ponte, conservando gli elementi senza progetti.
Il filtro topic degli studenti usa un JOIN con DISTINCT. I riepiloghi Projects sono riutilizzati per mantenere coerenti topics e ordinamento.
I metodi repository hanno JSDoc descrittivi senza annotazioni di typing; i commenti interni spiegano i passaggi di associazione.

## Configurazione locale

Richiede Node.js 24.14 o successivo e MySQL con il database `class14` già popolato.
Per una nuova installazione consultare [setup SQL](db/setup/README.md); non ricreare o reimportare il database locale esistente.

Dalla root del progetto:

```bash
npm run install:all
cp server/.env.example server/.env
```

Se `server/.env` esiste già, modificarlo senza sovrascriverlo. Impostare utente/password MySQL locali; `.env` è ignorato da Git.

| Variabile           | Default / requisito                                             |
| ------------------- | --------------------------------------------------------------- |
| PORT                | 3000; intero 1–65535                                            |
| DB_HOST             | localhost; stringa non vuota                                    |
| DB_PORT             | 3306; intero 1–65535                                            |
| DB_USER             | Obbligatoria; utente MySQL locale, senza default nel codice     |
| DB_PASSWORD         | Stringa vuota se il proprio utente locale non richiede password |
| DB_NAME             | class14; stringa non vuota                                      |
| DB_CONNECTION_LIMIT | 10; intero 1–100                                                |
| DB_CONNECT_TIMEOUT  | 10000 millisecondi; intero 1–60000                              |

Gli script caricano `server/.env` se presente. Le variabili esportate nel terminale hanno precedenza.
La `.env` della root e il token GitHub non sono utilizzati dal backend.

## Avvio

Dalla root:

```bash
npm run dev:server
```

`npm start` avvia il server senza watch. `npm run dev` avvia server e client insieme.
Dalla cartella server sono disponibili `npm run dev` e `npm start`.

La configurazione viene validata prima di creare il pool. Il server esegue `SELECT 1` prima di ascoltare sulla porta configurata.
In caso di configurazione non valida o connessione fallita termina con codice non zero; i log non stampano credenziali né l’oggetto di configurazione.
Un errore di ascolto (per esempio porta occupata) chiude il pool e segnala un codice di errore.

```bash
curl http://localhost:3000/
```

`test.http` contiene richieste Projects, Students, Cheat Sheets e Resources ripetibili, inclusi filtri, risultati vuoti e casi 400/404/500. La verifica effettuata ha confrontato tutte le relazioni dei 15 dettagli con il database: 124 repository, 39 associazioni PDF e 54 risorse, senza duplicati. Verificati anche tutti i 15 profili (3 senza repository), i 18 PDF e le 17 risorse, i filtri combinati e le associazioni inverse. Il caso dei materiali senza collegamenti è stato verificato con fixture isolate, senza scritture nel database. Non implica che i file statici siano già preparati: avatar/PDF saranno serviti nella fase 7.

## Riferimenti

- [Kanban](../KANBAN.md): ordine delle fasi e criteri di verifica.
- [Setup completo](../docs/SETUP.md): script root e client.
- [Linee guida](../docs/CODE-STYLE-GUIDELINES.md): stile procedurale.
- [Contesto](../AGENTS.md): dati, asset e limiti dell’MVP.
