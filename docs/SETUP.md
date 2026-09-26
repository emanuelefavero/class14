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

Il server carica `server/.env` se presente. Per configurare la password locale, copiare `server/.env.example` in `server/.env` e impostare `DB_PASSWORD`. Le variabili già esportate nel terminale hanno precedenza. La `.env` root non viene caricata dal backend. Non occorre un token GitHub.

Il pool attuale usa ancora localhost/root e il database class14: la configurazione completa del pool resta nella fase backend. Non ricreare il database esistente.

## Comandi dalla root

- `npm start`: avvia solo Express senza watch.
- `npm run build`: genera `client/dist/`.
- `npm run preview`: serve la build client per verifica locale; non avvia Express.
- `npm run lint`: controlla il client con Oxlint.
- `npm run audit:all`: verifica i tre package; si interrompe al primo audit fallito.

Il progetto usa JavaScript, senza script TypeScript/typecheck e senza richiedere JSDoc. `client/jsconfig.json` mantiene gli alias per l’editor. I lockfile vanno versionati; node_modules, dist e .env sono già ignorati.

## Stato verificato

Il 26 settembre 2026: installazione completata, build e lint riusciti, audit a zero vulnerabilità nei tre package, connessione MySQL riuscita e HTTP 200 dalle root server/client. Le feature blog e products restano come riferimento fino alla conversione a Class14.
