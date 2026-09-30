# Migrazione Git — Kanban

Questo kanban riguarda soltanto la separazione delle repository. Il lavoro
dell'MVP continua a essere tracciato in `docs/KANBAN.md`.

## 1. Preparare il monorepo

- [ ] Verificare documentazione, metadati e setup autonomo di `client/` e `server/`, poi creare un commit pulito in `class14`.

## 2. Preparare GitHub

- [x] Rinominare manualmente la repository corrente in `class14` e creare vuote e pubbliche `webapp-react` e `webapp-express`.

## 3. Configurare i remote

- [x] Aggiornare `origin`, aggiungere `client` e `server`, quindi verificarne URL e raggiungibilità.

## 4. Pubblicare i subtree

- [ ] Pubblicare `client/` su `webapp-react` e `server/` su `webapp-express` dalla cronologia committata del monorepo.

## 5. Verificare il risultato

- [ ] Confrontare gli alberi Git, provare i setup standalone e documentare il flusso di sincronizzazione completato.
