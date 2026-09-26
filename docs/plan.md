# 📌 Piano di Progetto: Class14 (WDPT14)

> **Stato degli asset:** `assets/students.js` contiene 15 studenti identificati dal solo nome e dallo username GitHub; `assets/projects.js` contiene i 15 progetti del periodo React e successivo, con una descrizione Markdown per ciascuno. I 18 PDF sono in `assets/cheatsheets/` e 39 associazioni progetto–PDF sono definite in `assets/project-cheatsheets.js`. Le 17 risorse esterne pertinenti e le 54 associazioni con i progetti derivano da `assets/resources.md`. Sono stati salvati 15 avatar e verificate 124 associazioni con repository pubbliche su 225 URL esatti tramite `node scripts/sync-github-assets.mjs`.

---

## 🎯 Visione del Progetto & Linee Guida di Sviluppo

Class14 è un'applicazione web Full-Stack per la classe WDPT14 del corso Boolean. È un hub di classe, archivio storico e piattaforma di ripasso: permette di esplorare i progetti svolti dal periodo React in poi, consultare i cheat sheet associati e visitare le repository GitHub pubbliche degli studenti. Il nome della cartella e della repository di questo progetto resta `webapp-express`.

### Principi Architetturali

- **No Over-Engineering:** Codice minimale, leggibile, performante e facile da estendere.
- **Single Source of Truth (SSOT) & DRY:** Nessuna duplicazione di logica di business o query.
- **KISS (Keep It Simple, Stupid):** Priorità alla chiarezza della struttura rispetto a astrazioni complesse.
- **Struttura a Risorse per il Backend:** Architettura basata su Feature Modules/Resources per garantire scalabilità.

---

## 🛠️ Tech Stack & Dipendenze

### Backend

- **Runtime:** Node.js (con **ES Modules** - `import/export`)
- **Framework:** Express.js
- **Database:** MySQL 8.x con driver `mysql2` (utilizzando `mysql2/promise` e `async/await`)
- **Validazione:** `zod` per la validazione di `req.body`, `req.params` e `req.query`
- **Architettura Codebase Backend:** Vedere riferimento stile su [express-blog-sql](https://github.com/emanuelefavero/express-blog-sql)

### Frontend

- **Framework/Bundler:** React con Vite (sfruttando il **React Compiler**)
- **Routing:** React Router (`react-router-dom`)
- **Linguaggio:** JavaScript (No TypeScript)
- **Styling:** CSS nativo con **CSS Nesting** e **CSS Custom Properties** (Variabili CSS). Design ispirato allo stile minimal/clean di **shadcn/ui**.
- **Theme:** Supporto automatico Dark/Light Mode tramite `prefers-color-scheme` in CSS. No Bootstrap o Framework CSS pesanti.
- **Architettura Codebase Frontend:** Vedere riferimento stile su [react-movie-filter](https://github.com/emanuelefavero/react-movie-filter)

---

## 🗄️ Modellazione Database MySQL

### 1. `students`

Rappresenta gli alunni della classe.

- `id` (INT, PK, AUTO_INCREMENT)
- `name` (VARCHAR(100), NOT NULL)
- `github_username` (VARCHAR(100), NOT NULL, UNIQUE)
- `avatar_path` (VARCHAR(255), NULL) - _percorso dell'immagine locale verificata_
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 2. `projects`

I progetti/esercizi ufficiali del corso.

- `id` (INT, PK, AUTO_INCREMENT)
- `slug` (VARCHAR(150), NOT NULL, UNIQUE) - _nome esatto della repository prevista_
- `title` (VARCHAR(150), NOT NULL)
- `description` (TEXT)
- `topics` (VARCHAR(255)) - _Tag separati da virgola: "React, Hooks, State"_
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 3. `cheatsheets`

I file PDF di ripasso archiviati.

- `id` (INT, PK, AUTO_INCREMENT)
- `title` (VARCHAR(150), NOT NULL)
- `file_path` (VARCHAR(255), NOT NULL) - _Es. "/cheatsheets/react-basics.pdf"_
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### 4. `student_projects` (Tabella Ponte N:M tra Studenti e Progetti)

Traccia quali progetti sono stati completati/pubblicati dagli studenti.

- `student_id` (INT, FK -> `students.id` ON DELETE CASCADE)
- `project_id` (INT, FK -> `projects.id` ON DELETE CASCADE)
- `repo_url` (VARCHAR(255), NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- **PRIMARY KEY:** (`student_id`, `project_id`)

### 5. `project_cheatsheets` (Tabella Ponte N:M tra Progetti e Cheat Sheet)

Permette di associare **uno o più cheat sheet** a un singolo progetto.

- `project_id` (INT, FK -> `projects.id` ON DELETE CASCADE)
- `cheatsheet_id` (INT, FK -> `cheatsheets.id` ON DELETE CASCADE)
- **PRIMARY KEY:** (`project_id`, `cheatsheet_id`)

### 6. `resources`

I link esterni di ripasso relativi agli argomenti dei progetti.

- `id` (INT, PK, AUTO_INCREMENT)
- `title` (VARCHAR(150), NOT NULL)
- `url` (VARCHAR(255), NOT NULL, UNIQUE)

### 7. `project_resources` (Tabella Ponte N:M tra Progetti e Risorse)

- `project_id` (INT, FK -> `projects.id` ON DELETE CASCADE)
- `resource_id` (INT, FK -> `resources.id` ON DELETE CASCADE)
- **PRIMARY KEY:** (`project_id`, `resource_id`)

---

## 📂 Asset e prossime fasi

- `assets/student-avatars.json` associa username e percorso dell'avatar locale.
- `assets/student-projects.json` contiene soltanto le coppie studente/progetto con URL GitHub verificato. Una coppia assente non implica che lo studente non abbia svolto l'esercizio: la repository può essere privata o non pubblicata.
- `assets/github-sync-status.json` conserva gli esiti delle verifiche e permette di riprendere la raccolta. `node scripts/sync-github-assets.mjs --refresh` ricontrolla anche gli URL già classificati.
- Le fasi di sviluppo sono tracciate in `KANBAN.md`: database e seed, API Express, frontend React, rifinitura e verifica.
