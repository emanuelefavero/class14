# Database di Class14

`schema.sql` crea il database `class14` e cinque tabelle: `students`, `projects`, `cheatsheets`, `student_projects` e `project_cheatsheets`. Non elimina tabelle o dati esistenti.

`seed.sql` è generato dagli asset del progetto e contiene 15 studenti, 15 progetti, 18 PDF, 124 associazioni con repository pubbliche verificate e 39 associazioni tra progetti e PDF. La mappatura dei PDF è curata in `assets/project-cheatsheets.js`: i tag dei progetti sono troppo generici per associare automaticamente ogni PDF in modo utile.

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

Per controllare i dati importati:

```sql
USE class14;
SELECT COUNT(*) FROM students;          -- 15
SELECT COUNT(*) FROM projects;          -- 15
SELECT COUNT(*) FROM cheatsheets;       -- 18
SELECT COUNT(*) FROM student_projects;  -- 124
SELECT COUNT(*) FROM project_cheatsheets; -- 39
```

I percorsi `/avatars/...` e `/cheatsheets/...` nei dati sono URL da servire con Express quando verrà creato il backend. I file originali restano in `assets/`.
