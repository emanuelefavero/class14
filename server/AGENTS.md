# Project instructions

## Before working

- Read `README.md`, `package.json`, and relevant project documentation if present.
- Inspect the existing structure, conventions, and current Git changes before editing.
- Read and follow `.agents/CODE-STYLE-GUIDELINES.md`. If project requirements
  conflict with it, report the conflict instead of choosing silently.
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

- Commit or push only when explicitly requested.
- Use concise Conventional Commit messages such as `feat:`, `fix:`, `refactor:`,
  `test:`, `docs:`, `style:`, `build:`, and `chore:`.
