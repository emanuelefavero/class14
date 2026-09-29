# Class14 client

Frontend React/Vite del Learning Hub WDPT14. La direzione UI e UX è in [DESIGN.md](../DESIGN.md); il contratto delle API è in [docs/API-CONTRACT.md](../docs/API-CONTRACT.md).

## Avvio

Seguire [docs/SETUP.md](../docs/SETUP.md) dalla root del repository. Durante lo sviluppo Vite inoltra `/api`, `/avatars` e i file sotto `/cheatsheets/` al server Express: le richieste del client usano percorsi relativi. La pagina `/cheatsheets` resta una route React.

## Stato

- React Router Declarative Mode con `RootLayout`, Header, Main e Footer.
- Home Class14 con i contatori letti da `/api/stats` tramite Axios e validati con Zod in `src/features/stats/`.
- L'header mostra Argomenti, Progetti e Studenti; il logo porta alla Home. Cheat sheet e Risorse sono raggiungibili dalla Home e dal footer.
- Liste e dettagli di Argomenti, Progetti e Studenti sono collegati tra loro; i cataloghi Cheat sheet e Risorse riportano ai progetti. Le risposte dell'API sono validate con Zod in `src/features/catalog/`.
- Le descrizioni dei progetti sono renderizzate come Markdown senza HTML non attendibile. La feature Products del boilerplate e le chiamate Fake Store API sono state rimosse.
- Ricerca e filtri restano nella fase 10 del [KANBAN](../KANBAN.md).

Il CSS è nativo, con token in `src/index.css`, tema automatico chiaro/scuro e componenti riutilizzabili in `src/components/`.
