# Project instructions

## Before working

- Read `README.md`, `package.json`, and relevant project documentation if present.
- Inspect the existing structure, conventions, and current Git changes before editing.
- Nel monorepo, leggere e seguire `../AGENTS.md`,
  `../docs/CODE-STYLE-GUIDELINES.md` e `../docs/API-CONTRACT.md`. Nella
  repository backend autonoma, consultare gli stessi documenti nella
  repository pubblica `emanuelefavero/class14` collegata dal README. Se i
  requisiti entrano in conflitto, segnalare il conflitto senza scegliere in
  silenzio.
- If `.agents/skills/` exists, use only skills relevant to the current task and
  read their `SKILL.md` before acting.

## Working rules

- Match surrounding naming, structure, formatting, and comment density.
- Prefer the smallest clear solution appropriate to the project's current scope.
- Preserve existing changes and avoid unrelated refactors.
- Do not add dependencies, tooling, architecture, or features unless requested or
  concretely required.
- Respect checked-in formatter and linter configuration. Treat only explicitly
  configured options as project preferences; do not infer rules from editor
  behavior.

## Verification

- Use existing package scripts and the narrowest checks appropriate to the change.
- Report what was verified and what was not.

## Git

- Il monorepo `class14` è la source of truth. La repository autonoma
  `webapp-express` viene pubblicata da `server/` tramite Git subtree: non
  sviluppare o sincronizzare modifiche nella direzione opposta.
- Commit or push only when explicitly requested.
- Use concise Conventional Commit messages such as `feat:`, `fix:`, `refactor:`,
  `test:`, `docs:`, `style:`, `build:`, and `chore:`.
