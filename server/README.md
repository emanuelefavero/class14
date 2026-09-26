# Class14 — backend Express

Backend del Learning Hub e Student Showcase della classe Boolean WDPT14.
Node.js, Express, JavaScript ESM, mysql2/promise e Zod per la validazione.

## Stato

Configurazione e avvio sono adattati a Class14. `GET /` restituisce il brand e lo stato della conversione.
Le API MVP sono definite nel [contratto](../docs/API-CONTRACT.md) e devono ancora essere implementate.
Le routes posts e le routes di prova errors restano temporaneamente come riferimento: posts usa il modello del vecchio blog, non i dati Class14. Non usare il CRUD posts sul database Class14.

## Configurazione locale

Richiede Node.js 24.14 o successivo e MySQL con il database `class14` già popolato.
Per una nuova installazione consultare [setup SQL](db/setup/README.md); non ricreare o reimportare il database locale esistente.

Dalla root del progetto:

```bash
npm run install:all
cp server/.env.example server/.env
```

Se `server/.env` esiste già, modificarlo senza sovrascriverlo. Impostare utente/password MySQL locali; `.env` è ignorato da Git.

| Variabile | Default / requisito |
| --- | --- |
| PORT | 3000; intero 1–65535 |
| DB_HOST | localhost; stringa non vuota |
| DB_PORT | 3306; intero 1–65535 |
| DB_USER | Obbligatoria; utente MySQL locale, senza default nel codice |
| DB_PASSWORD | Stringa vuota se il proprio utente locale non richiede password |
| DB_NAME | class14; stringa non vuota |
| DB_CONNECTION_LIMIT | 10; intero 1–100 |
| DB_CONNECT_TIMEOUT | 10000 millisecondi; intero 1–60000 |

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

Le richieste in `test.http` sono ancora quelle del blog: verranno sostituite durante le fasi API.

## Riferimenti

- [Kanban](../KANBAN.md): ordine delle fasi e criteri di verifica.
- [Setup completo](../docs/SETUP.md): script root e client.
- [Linee guida](../docs/CODE-STYLE-GUIDELINES.md): stile procedurale.
- [Contesto](../AGENTS.md): dati, asset e limiti dell’MVP.
