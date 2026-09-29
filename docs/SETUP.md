# Class14 — avvio locale

Richiede Node.js 24.14 o successivo e il database MySQL `class14` già popolato.

## Installazione

Dalla root, dopo il clone:

```bash
npm run install:all
```

Lo script esegue `npm ci` nella root, in `server/` e in `client/` usando i tre lockfile. Le dipendenze restano separate; non sono configurati workspaces.

## Avvio

```bash
npm run dev
```

Avvia Express e Vite insieme. Ctrl+C termina entrambi. Il server usa la porta 3000 salvo variabile `PORT`; Vite usa 5173 o la prima successiva disponibile.

Per avviarli separatamente: `npm run dev:server` e `npm run dev:client`.

Il server carica `server/.env` se presente. Copiare `server/.env.example` in `server/.env` solo se il file non esiste e impostare `DB_USER` (obbligatoria) e `DB_PASSWORD` per il proprio MySQL locale. Le variabili già esportate nel terminale hanno precedenza. La `.env` root non viene caricata dal backend. Non occorre un token GitHub.

Il pool legge host, porta, utente, password, database, limite connessioni e timeout dalle variabili d’ambiente, validate in `server/config/env.js`. I default e i requisiti sono documentati nel [README server](../server/README.md); non ci sono credenziali fisse nel codice. Non ricreare il database esistente.

## Comandi dalla root

- `npm start`: avvia solo Express senza watch.
- `npm run build`: genera `client/dist/`.
- `npm run preview`: serve la build client per verifica locale; non avvia Express.
- `npm run lint`: controlla il client con Oxlint.
- `npm run audit:all`: verifica i tre package; si interrompe al primo audit fallito.

Il progetto usa JavaScript, senza script TypeScript/typecheck e senza richiedere JSDoc. `client/jsconfig.json` mantiene gli alias per l’editor. I lockfile vanno versionati; node_modules, dist e .env sono già ignorati.

## Stato verificato

Il 29 settembre 2026: MVP locale implementato, build e lint riusciti. I controlli HTTP essenziali hanno restituito 200 per Home API, contatori, liste filtrate e dettagli di Argomenti, Progetti e Studenti; un progetto inesistente ha restituito 404. L'utente ha verificato navigazione, collegamenti, file statici, accessi diretti, mobile, tastiera, focus, etichette, temi e un buon risultato Lighthouse. Il controllo precedente delle dipendenze dei tre package aveva riportato zero vulnerabilità. La build segnala un bundle JavaScript sopra la soglia di avviso di Vite, pur completandosi correttamente.

## Collegamento client–server

Vite inoltra `/api`, `/avatars` e i file sotto `/cheatsheets/` a `http://localhost:3000`, conservando i percorsi. La pagina `/cheatsheets` è gestita da React. Dal client usare URL relativi: `fetchData('/api/projects')`, `src={student.avatar_path}` e `href={cheatsheet.file_path}`. Non serve aggiungere CORS a Express per questa configurazione locale.

Se si cambia la porta backend, avviare entrambi con la stessa variabile esportata, per esempio `PORT=3001 npm run dev`. Il proxy legge `PORT` dal terminale, non da `server/.env`: se si modifica soltanto quel file, allineare anche il target Vite. Riavviare Vite dopo il cambio.

Avatar e PDF sono in `server/public/avatars` e `server/public/cheatsheets`; il seed SQL contiene già i loro percorsi. I dati di preparazione in `.local/` non servono per importare il database.

Il proxy è una configurazione locale Vite, non viene incorporato nella build. Deployment e hosting restano una decisione futura dopo il confronto con l'insegnante; nessun URL pubblico è attualmente configurato.
