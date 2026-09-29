# Class14 client

Frontend React/Vite del Learning Hub WDPT14. La direzione UI e UX è in [DESIGN.md](../DESIGN.md); il contratto delle API è in [docs/API-CONTRACT.md](../docs/API-CONTRACT.md).

## Avvio

Seguire [docs/SETUP.md](../docs/SETUP.md) dalla root del repository. Durante lo sviluppo Vite inoltra `/api`, `/avatars` e `/cheatsheets` al server Express: le richieste del client usano percorsi relativi.

## Stato

- React Router Declarative Mode con `RootLayout`, Header, Main e Footer.
- Home Class14 con i contatori letti da `/api/stats` tramite Axios e validati con Zod in `src/features/stats/`.
- L'header mostra Argomenti, Progetti e Studenti; il logo porta alla Home. Cheat sheet e Risorse restano raggiungibili dalla Home e tramite URL diretto. Le cinque sezioni mostrano per ora una pagina introduttiva; i cataloghi e i dettagli saranno collegati nelle prossime fasi del [KANBAN](../KANBAN.md).
- La feature Products copiata dal progetto di riferimento resta temporaneamente raggiungibile tramite `/products` e non compare nel menu. Sarà rimossa quando il flusso Projects di Class14 la sostituirà.

Il CSS è nativo, con token in `src/index.css`, tema automatico chiaro/scuro e componenti riutilizzabili in `src/components/`.
