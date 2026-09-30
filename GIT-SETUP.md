# Git setup: monorepo e repository separate

Class14 viene sviluppato nel monorepo `class14` e pubblicato anche in due
repository richieste per la consegna del corso:

```text
class14/
├── client/   → emanuelefavero/webapp-react
└── server/   → emanuelefavero/webapp-express
```

Il monorepo conserva la cronologia completa ed è l'unica source of truth. Le
repository separate sono mirror ottenuti con Git subtree: non sviluppare
direttamente al loro interno e non usare `git subtree pull` nel flusso normale.

Lo stato della migrazione è tracciato in
[GIT-MIGRATION-KANBAN.md](GIT-MIGRATION-KANBAN.md).

## 1. Operazioni manuali su GitHub

1. Rinominare `emanuelefavero/webapp-express` in
   `emanuelefavero/class14`.
2. Creare `emanuelefavero/webapp-react` come repository pubblica e vuota.
3. Creare una nuova `emanuelefavero/webapp-express` come repository pubblica e
   vuota.

Le due nuove repository non devono essere inizializzate con README, licenza o
`.gitignore`: questi file arriveranno dal monorepo. Riutilizzare il vecchio nome
`webapp-express` interrompe intenzionalmente il redirect GitHub verso
`class14`; i vecchi link vanno quindi aggiornati.

## 2. Configurazione dei remote locali

Dopo le operazioni su GitHub, eseguire dalla root del monorepo:

```bash
git remote set-url origin https://github.com/emanuelefavero/class14.git
git remote add client https://github.com/emanuelefavero/webapp-react.git
git remote add server https://github.com/emanuelefavero/webapp-express.git
```

La configurazione attesa è:

```text
origin  → monorepo class14
client  → frontend webapp-react
server  → backend webapp-express
```

Verificare senza pubblicare nulla:

```bash
git remote -v
git fetch origin --prune
git ls-remote client
git ls-remote server
git status --short --branch
```

`git ls-remote` non mostra branch finché una repository è completamente vuota.

## 3. Prima pubblicazione

Git subtree pubblica soltanto file già inclusi in un commit. Prima dello split,
verificare che le modifiche siano state controllate, committate nel monorepo e
pubblicate su `origin/main`.

```bash
git subtree push --prefix=client client main
git subtree push --prefix=server server main
```

Il primo comando trasforma `client/` nella root di `webapp-react`; il secondo fa
lo stesso con `server/` e `webapp-express`. Il monorepo non perde file o commit.
Le cronologie filtrate conservano autori, date e messaggi pertinenti, ma hanno
normalmente hash differenti perché cambia la root dei commit.

## 4. Verifica

Dopo la prima pubblicazione:

```bash
git fetch client
git fetch server
git diff --exit-code HEAD:client client/main
git diff --exit-code HEAD:server server/main
```

Entrambi i diff devono essere vuoti. È inoltre consigliato clonare le due
repository in cartelle temporanee e verificare `npm ci`; nel frontend eseguire
anche `npm run lint` e `npm run build`.

## Aggiornamenti successivi

Ogni modifica parte dal monorepo:

```bash
git push origin main
git subtree push --prefix=client client main  # se cambia il frontend
git subtree push --prefix=server server main  # se cambia il backend
```

Se qualcuno crea commit direttamente in una repository figlia, il push subtree
può essere rifiutato per cronologie divergenti. In quel caso non forzare il
push: confrontare prima i commit e riportare consapevolmente la modifica nel
monorepo.
