# Database di Class14

`schema.sql` crea il database `class14` e sette tabelle: `students`, `projects`, `cheatsheets`, `resources`, `student_projects`, `project_cheatsheets` e `project_resources`. Non elimina tabelle o dati esistenti.

`seed.sql` è generato dagli asset del progetto e contiene 15 studenti, 15 progetti, 18 PDF, 17 risorse esterne, 124 associazioni con repository pubbliche verificate, 39 associazioni tra progetti e PDF e 54 tra progetti e risorse. La mappatura dei PDF è curata in `assets/project-cheatsheets.js`: i tag dei progetti sono troppo generici per associare automaticamente ogni PDF in modo utile. Le risorse vengono lette da `assets/resources.md` e associate tramite i tag dei progetti; il link React Router è limitato al progetto `react-router`.

## Generare e importare

Dalla radice del progetto:

```bash
node scripts/generate-seed.mjs
node scripts/generate-seed.mjs --check
mysql -u root -p < server/db/setup/schema.sql
mysql -u root -p < server/db/setup/seed.sql
```

Gli stessi due file SQL possono essere aperti ed eseguiti in MySQL Workbench, prima lo schema e poi il seed. Le righe con la stessa chiave naturale vengono aggiornate quando il seed è rieseguito; il seed non cancella righe aggiunte manualmente.

Se hai già importato la versione precedente del seed, applica solo i nuovi collegamenti:

```bash
mysql -u root -p class14 < server/db/setup/project-cheatsheets.sql
```

Questo file è generato dallo stesso script ed è rieseguibile senza duplicare le coppie.

Se hai già importato lo schema e il seed precedenti, aggiungi le nuove tabelle ed esegui solo il seed delle risorse:

```bash
mysql -u root -p < server/db/setup/schema.sql
mysql -u root -p class14 < server/db/setup/project-resources.sql
```

`project-resources.sql` inserisce o aggiorna le risorse usando l'URL come chiave unica e aggiunge le coppie mancanti senza duplicarle. I link esterni sono copiati dagli asset senza verificarne il contenuto online.

Per controllare i dati importati:

```sql
USE class14;
SELECT COUNT(*) FROM students;          -- 15
SELECT COUNT(*) FROM projects;          -- 15
SELECT COUNT(*) FROM cheatsheets;       -- 18
SELECT COUNT(*) FROM student_projects;  -- 124
SELECT COUNT(*) FROM project_cheatsheets; -- 39
SELECT COUNT(*) FROM resources;          -- 17
SELECT COUNT(*) FROM project_resources;  -- 54
```

I percorsi `/avatars/...` e `/cheatsheets/...` sono serviti da Express dai file in `server/public/avatars/` e `server/public/cheatsheets/`. Le mappature restano in `assets/`.
