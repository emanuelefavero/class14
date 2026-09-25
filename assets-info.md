# Asset di Class14

In questa sezione vengono fornite informazioni sugli asset inclusi in questo progetto.

Tutti gli asset si trovano nella cartella `assets`.

## Elenco degli asset

- `cheatsheets/` - Contiene vari cheatsheet da servire statici dall'api express nella public folder in `public/cheatsheets`. Questi cheat sheet dovranno poi poter essere accessibili e legati ai progetti. Per esempio ogni progetto potrebbe avere un proprio cheatsheet dedicato o una lista di cheatsheet. I cheat sheet potrebbero essere utili anche da mostrare in una lista degli argomenti trattati nel corso, che sarebbero i tags dei progetti. Non vorrei mostrare in nomi delle lezioni del corso Boolean nell'applicazione, ma usare i tags e argomenti dei progetti come riferimento, per esempio l'argomento "React" potrebbe essere collegato a tutti i progetti che trattano di React (o un progetto potra' avere piu' cheatsheet e piu' argomenti) e avere tutti i cheatsheet relativi a React.
- `project-descriptions` - Contiene le descrizioni dei progetti. Queste descrizioni possono essere utilizzate per fornire informazioni dettagliate sui progetti all'interno dell'applicazione, come obiettivi, funzionalità principali e tecnologie utilizzate. Le descrizioni provengono dal nostro insegnante e sono in markdown. In alcuni progetti c'e' vengono menzionati file allegati, questi non ce li ho aggiunti, dato che l'applicazione mostrera' comunque i progetti degli alunni e chi vuole puo' dare un occhiata ai file originali forniti dall'insegnante per conto proprio. Nota: puoi decidere di modificare le descrizioni se necessario per adattarle meglio all'applicazione, ma assicurati che il testo sia markdown corretto, con un solo titolo `#` principale per file e correttamente formattato.
- `lessons.json` - Contiene le informazioni sulle lezioni del corso, come titoli e data e ora su inizio e fine delle lezioni. Usa questo file per capire il calendario delle lezioni e per mostrare correttamente le informazioni relative alle lezioni all'interno dell'applicazione, se necessario.
- `projects.js` - Contiene i 15 progetti del periodo React e successivo. `name` è il nome esatto atteso per la repository GitHub; i tag descrivono gli argomenti. Il file Markdown corrispondente ha lo stesso nome in `project-descriptions/`. Il titolo leggibile per l'interfaccia può derivare dal titolo principale della descrizione, senza il prefisso "Esercizio:".
- `resources.md` - Contiene i link esterni organizzati per argomento. I tag HTML, CSS, JavaScript e Bootstrap sono disponibili come risorse, ma non implicano l'inclusione degli esercizi precedenti a React.
- `students.js` - Contiene nome di battesimo e username GitHub dei 15 studenti. Lo username identifica lo studente anche se in futuro due studenti avranno lo stesso nome.
- `project-cheatsheets.js` - Elenca i PDF pertinenti a ciascuno dei 15 progetti. La mappatura è esplicita perché un tag come `React` non distingue, per esempio, un PDF sul router da uno su `useState`. Lo script del seed verifica che i progetti e i PDF citati esistano.
- `avatars/` e `student-avatars.json` - Immagini dei profili GitHub salvate localmente e relativa mappatura `{ github, path }`. I file vengono scaricati dall'URL `avatar_url` restituito dall'API GitHub.
- `student-projects.json` - Elenco delle associazioni `{ github, project, repoUrl }` verificate. La verifica considera esclusivamente `https://github.com/{github}/{project}`; nessuna ricerca di nomi alternativi o repository simili.
- `github-sync-status.json` - Esiti `found`, `missing` o `error` per ogni profilo e URL candidato. `missing` indica che la risorsa non è pubblicamente raggiungibile; `error` indica una verifica da riprovare. Lo script `node scripts/sync-github-assets.mjs` riprende i controlli mancanti o falliti; con `--refresh` ripete anche quelli già completati.

## Raccolta e aggiornamento

Esegui dalla radice del progetto:

```bash
node scripts/sync-github-assets.mjs
```

Lo script usa `curl` e non richiede dipendenze npm. Per aggiornare le repository pubblicate dopo la prima raccolta, eseguilo con `--refresh`. Se GitHub blocca temporaneamente le richieste, gli errori restano distinti dalle repository mancanti e l'esecuzione successiva riprende i controlli.
