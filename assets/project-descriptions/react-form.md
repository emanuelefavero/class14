# Esercizio: React Blog Form

Repo: `react-form`

---

## Fase 1

### Descrizione

#### Milestone 1

Creare una pagina che visualizzi una lista di articoli, mostrandone solo il titolo.

#### Milestone 2

Aggiungiamo in pagina un semplice form con un campo input in cui inserire il titolo di un nuovo articolo del blog. Al submit del form, mostrare la lista degli articoli aggiornati.

### BONUS

Aggiungere la possibilità di cancellare ciascun articolo utilizzando un'icona.
Impostare il lavoro su più componenti.

---

## Fase 2

### Descrizione 2

Continuiamo a estendere il blog in react. Aggiungiamo un form con più campi per creare un nuovo post all’interno di un blog.

I dati che il form dovrà inviare sono i seguenti:

author (string) - L’autore del post
title (string) - Il titolo del post
body (string) - Il testo del post
public (boolean) - Se il post deve essere pubblico (true) o una bozza (false)

### BONUS 2

Per gestire il campo "public" proviamo a usare una checkbox, invece di un input in cui scrivere "true" o "false". possiamo distinguere il campo public verificando il suo .name (o il suo .type) con un if.
