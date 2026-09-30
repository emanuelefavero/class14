# Database di Class14

`schema.sql` crea il database `class14` e sette tabelle: `students`, `projects`, `cheatsheets`, `resources`, `student_projects`, `project_cheatsheets` e `project_resources`. Non elimina tabelle o dati esistenti.

`seed.sql` contiene tutti i dati necessari: 15 studenti, 15 progetti, 18 PDF, 17 risorse esterne, 124 associazioni con repository pubbliche verificate, 39 associazioni tra progetti e PDF e 54 tra progetti e risorse. Non richiede asset o script di generazione per essere importato.

## Creare e popolare il database

Dalla root della repository backend, oppure da `server/` nel monorepo:

```bash
mysql -u root -p < db/setup/schema.sql
mysql -u root -p < db/setup/seed.sql
```

Gli stessi due file SQL possono essere aperti ed eseguiti in MySQL Workbench, prima lo schema e poi il seed. `schema.sql` crea il database e le tabelle solo se mancano. Il seed aggiorna le righe con la stessa chiave naturale e non duplica le associazioni; non elimina eventuali righe obsolete o aggiunte manualmente.

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

I percorsi `/avatars/...` e `/cheatsheets/...` sono salvati nel seed. Per visualizzare avatar e PDF nell'app servono anche i file in `public/avatars/` e `public/cheatsheets/`.
