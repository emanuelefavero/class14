# Class14

Class14 è una piattaforma di studio per la classe WDPT14 del corso Web Development Part Time di Boolean. Riunisce i progetti svolti da React in poi, gli appunti e le risorse utili per ripassare gli argomenti del corso.

Ogni progetto raccoglie la sua descrizione, i materiali collegati e le repository pubbliche degli studenti. Si può partire da un argomento, esplorare i progetti della classe e trovare gli appunti o i link utili per studiarlo.

![mockup](./mockup.png 'mockup')

## Sviluppo locale

Servono Node.js 24.14 o successivo e MySQL avviato. Dopo aver clonato la repository, esegui questi passaggi dalla sua cartella principale:

- Installa le dipendenze di root, server e client:

  ```bash
  npm run install:all
  ```

- Crea il database `class14` e importa i dati. Se il tuo utente MySQL non è `root`, sostituiscilo in entrambi i comandi:

  ```bash
  mysql -u root -p < server/db/setup/schema.sql
  mysql -u root -p < server/db/setup/seed.sql
  ```

- Copia il [file di esempio](server/.env.example) e modifica `server/.env` con le credenziali del tuo MySQL:

  ```bash
  cp server/.env.example server/.env
  ```

  Per esempio, con l'utente MySQL `root`:

  ```dotenv
  DB_USER=root
  DB_PASSWORD=la_tua_password
  DB_NAME=class14
  ```

  Il file di esempio contiene anche host, porta e altre opzioni. Se il tuo utente MySQL non ha una password, lascia `DB_PASSWORD` vuoto. `server/.env` è ignorato da Git.

- Avvia server e client insieme:

  ```bash
  npm run dev
  ```

Apri l'indirizzo mostrato da Vite nel terminale (di solito `http://localhost:5173`). Il server Express usa la porta 3000. Per fermarli, premi `Ctrl+C`. Il seed SQL contiene già tutti i dati; avatar e PDF sono inclusi in `server/public/`.

## Esplorare l'app

- **Argomenti:** progetti e materiali collegati a ciascun topic.
- **Progetti:** descrizione, repository disponibili degli studenti, cheat sheet e risorse.
- **Studenti:** profili con avatar, GitHub e repository presenti nel catalogo.
- **Cheat sheet e Risorse:** cataloghi accessibili dalla Home, dal footer e dai progetti.

Le liste hanno ricerca e filtri. Il catalogo comprende 15 studenti, 15 progetti, 18 PDF, 17 risorse e 124 repository pubbliche verificate.

## Struttura e documentazione

Il server Express è in `server/`, il client React/Vite in `client/`. Il database MySQL si crea dai file in `server/db/setup/`.

- [Altri comandi e dettagli sull'avvio](docs/SETUP.md)
- [Setup del database](server/db/setup/README.md)
- [Contratto API](docs/API-CONTRACT.md)
- [Piano del progetto](docs/PLAN.md) e [design frontend](docs/DESIGN.md)

## License

- [MIT](LICENSE.md)
