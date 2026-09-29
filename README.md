# Class14

Learning Hub e Student Showcase della classe Boolean Web Development Part Time 14 (WDPT14). Raccoglie i progetti svolti da React in poi, i materiali di ripasso e le repository pubbliche verificate degli studenti.

## Esplorare l'app

- **Argomenti:** ogni topic porta ai progetti associati e ai materiali dei progetti collegati.
- **Progetti:** descrizione, topic, studenti con repository disponibili, cheat sheet e risorse.
- **Studenti:** profili con avatar, GitHub e repository dei progetti presenti nel catalogo.
- **Cheat sheet e Risorse:** cataloghi consultabili dalla Home, dal footer e dai progetti.
- **Ricerca e filtri:** nelle liste di Progetti, Studenti, Cheat sheet e Risorse; `q` e `topic` restano nell'URL.

Il catalogo attuale comprende 15 studenti, 15 progetti, 18 PDF, 17 risorse e 124 repository pubbliche verificate. La presenza di una repository non certifica il completamento di un esercizio.

## Stack e struttura

Il backend in `server/` usa Node.js, Express, MySQL e Zod. Il frontend in `client/` usa React, Vite, React Router in Declarative Mode, Axios, Zod e CSS nativo. Il database conserva le sette tabelle dell'MVP; i topic derivano dai tag dei progetti.

- [Avvio locale e comandi](docs/SETUP.md)
- [Contratto API](docs/API-CONTRACT.md)
- [Direzione del progetto](docs/PLAN.md) e [design frontend](docs/DESIGN.md)
- [Stato del lavoro](docs/KANBAN.md)
- [Setup del database](server/db/setup/README.md)

## Avvio rapido

Richiede Node.js 24.14 o successivo e MySQL. Dalla root del progetto, creare e popolare `class14` con i due SQL inclusi nella repository:

```bash
mysql -u root -p < server/db/setup/schema.sql
mysql -u root -p < server/db/setup/seed.sql
```

Il seed include già tutti i dati e le associazioni: non servono gli asset locali per importarlo. Avatar e PDF devono restare in `server/public/`. Dopo aver configurato `server/.env` seguendo [le istruzioni di setup](docs/SETUP.md):

```bash
npm run install:all
npm run dev
```

Aprire l'URL mostrato da Vite. Il proxy di sviluppo inoltra `/api`, `/avatars` e i PDF a Express. Per verificare il client: `npm run lint` e `npm run build`.
