# Git Push Workflow

Per aggiornare tutte le modifiche locali di `class14` e le due git subtrees `webapp-express` e `webapp-react`, puoi utilizzare i seguenti comandi:

```bash
# Push changes for the main repository
git push origin main

# Push changes for the webapp-express subtree
git subtree push --prefix=server server main

# Push changes for the webapp-react subtree
git subtree push --prefix=client client main
```

> Nota: Tutto questo in base a se abbiamo modificato le rispettive directory e i relativi subtree. Per esempio, se il client non e' stato modificato, non e' necessario eseguire il push per il subtree `webapp-react`.
