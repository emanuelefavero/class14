# Class14 — direzione design e UX

Questo documento guida il frontend dell'MVP. [PLAN.md](PLAN.md) descrive la visione più ampia, [AGENTS.md](AGENTS.md) ne delimita il perimetro attuale e [docs/API-CONTRACT.md](docs/API-CONTRACT.md) definisce i dati disponibili. Le regole qui sotto sono scelte di design, non feature già implementate nel client.

## Identità

**Tesi visiva:** un archivio del percorso WDPT14 che unisce la calma di una documentazione per sviluppatori alla cura di una scheda editoriale. Class14 deve apparire affidabile, contemporanea e semplice da consultare, sia per chi ripassa sia per chi vuole conoscere il lavoro della classe.

**Idea riconoscibile:** il numero **14** come segno tipografico del brand, accompagnato da contenuti autentici: nomi, avatar, progetti e materiali della classe. Non servono immagini fittizie dei progetti o illustrazioni decorative per riempire le pagine.

**Ispirazioni:** la sobrietà dei componenti Vega di shadcn/ui, la chiarezza di navigazione di GitHub e delle documentazioni per sviluppatori, la precisione tipografica di Stripe. Riprenderne i principi visivi, senza installare shadcn/ui, Tailwind CSS o un nuovo framework di componenti. Usare CSS nativo e partire dai componenti già presenti in `client/src/components/`.

L'interfaccia è in italiano; codice, percorsi, API, slug e nomi originali di progetti e tecnologie restano in inglese.

## Sistema visivo

- **Composizione:** contenuto centrale con larghezza leggibile, margini ampi su desktop e spazio ben distribuito su mobile. Usare titoli, colonne, elenchi e separatori prima di aggiungere contenitori. Ogni sezione deve avere uno scopo e un'azione chiari.
- **Schede visuali:** per dettagli di progetti e argomenti usare blocchi distinti per descrizione, relazioni e azioni. Un bordo sottile o una superficie lievemente diversa basta a separare i blocchi; evitare griglie di card identiche per ogni riga e ombre decorative. Le liste dei cataloghi possono essere righe compatte, mentre una card è utile quando l'intero elemento è un'azione.
- **Tipografia:** IBM Plex Sans per interfaccia e lettura; IBM Plex Mono per piccoli identificatori, percorsi e metadati tecnici. Al massimo queste due famiglie, con fallback sans-serif e monospace. Titoli marcati ma non monumentali nelle pagine operative; testo delle descrizioni Markdown con larghezza di lettura contenuta e ritmo verticale generoso.
- **Colore:** basi neutre e un solo accento blu indaco per link, focus, selezione e azioni principali. Conservare come punto di partenza il blu già presente nel client (`#3948ec` nel tema chiaro, `#949dff` nel tema scuro), verificandone il contrasto durante l'implementazione. Colori di errore o successo hanno solo funzione di stato, non di decorazione.
- **Token:** riusare e affinare le custom properties di `client/src/index.css` per sfondo, superfici, testo, testo attenuato, bordo, accento, focus e raggi. I nomi devono esprimere il ruolo del colore, così gli stessi componenti funzionano nei temi chiaro e scuro con `prefers-color-scheme`.
- **Dettagli:** bordi sottili, raggi moderati, icone solo dove migliorano la scansione. Niente gradienti vistosi, pannelli flottanti o mosaici di statistiche. Gli avatar sono piccoli riferimenti alle persone, non elementi decorativi ingranditi.

## Architettura dell'esperienza

La Home è un **hub editoriale**, non una dashboard amministrativa. Il primo schermo mostra Class14, una breve spiegazione del percorso della classe e un invito a esplorare gli **Argomenti**. Seguono accessi a Progetti e materiali, un richiamo agli Studenti e i cinque contatori del catalogo in forma discreta. I contatori descrivono il catalogo attuale; non rappresentano completamenti o l'intero profilo GitHub degli studenti.

Il menu principale è diretto e nell'ordine: **Home, Argomenti, Progetti, Studenti, Cheat sheet, Risorse**. Su desktop le sei destinazioni sono visibili nell'header. Su mobile un menu compatto, azionabile da tastiera e con stato aperto/chiuso comprensibile, mantiene le stesse destinazioni. Il logo Class14 porta alla Home. La navigazione delle pagine interne deve rendere chiaro dove ci si trova e offrire un ritorno sensato alla lista o all'argomento di partenza; i link tra risorse sono più importanti di un pulsante Indietro globale.

Il percorso principale è:

```text
Argomento → Progetti collegati → Dettaglio progetto
                                     ├→ PDF e risorse
                                     └→ Studenti → Profilo → Repository GitHub
```

Ogni catalogo resta comunque raggiungibile direttamente. Le relazioni devono funzionare nei due sensi quando l'API fornisce i dati: il progetto porta ai profili degli studenti e ai materiali; il profilo torna ai progetti; PDF e risorse mostrano i progetti collegati. Un topic raggruppa progetti e mostra i **“Materiali dei progetti collegati”**: il legame con PDF e risorse è indiretto, non una categorizzazione editoriale del materiale.

| Vista | Contenuto principale | Azioni e collegamenti |
| --- | --- | --- |
| Home | Introduzione breve, accessi alle sezioni, contatori | Iniziare dagli Argomenti; aprire Progetti o Studenti |
| Argomenti | Elenco dei tag con numero di progetti | Aprire il dettaglio dell'argomento |
| Dettaglio argomento | Nome, progetti e materiali dei progetti collegati | Aprire un progetto, un PDF o una risorsa |
| Progetti | Titolo e tag in un catalogo leggibile | Cercare per titolo/slug, filtrare per topic, aprire il dettaglio |
| Dettaglio progetto | Descrizione Markdown, tag, studenti con repository, PDF e risorse | Aprire profili, repository, PDF, risorse e argomenti |
| Studenti | Avatar, nome e username GitHub | Cercare per nome/username, filtrare per topic, aprire il profilo |
| Profilo studente | Identità, argomenti dei progetti associati e repository disponibili | Aprire GitHub, progetto o repository verificata |
| Cheat sheet | Titolo del PDF e progetti collegati | Aprire o scaricare il PDF; aprire un progetto |
| Risorse | Titolo, link esterno e progetti collegati | Aprire la risorsa; aprire un progetto |

Nelle pagine di dettaglio, l'intestazione mostra titolo e metadati essenziali. Il contenuto principale occupa la colonna di lettura; su desktop le azioni e le relazioni più brevi possono stare in una colonna secondaria, solo se questo aiuta la consultazione. Su schermi stretti tutto segue un ordine verticale naturale. Non aggiungere indici laterali, tab o pannelli persistenti prima che la quantità reale di contenuti lo richieda.

## Interazioni e stati

- Ricerca e filtro topic appartengono ai cataloghi che li supportano. I controlli mostrano il filtro attivo, permettono di azzerarlo e distinguono “nessun risultato” da un errore di caricamento. Non introdurre una ricerca globale nell'MVP.
- Le liste e i dettagli mostrano caricamento, errore e stato vuoto con testi brevi e azioni utili. Un profilo con zero repository resta un profilo valido; il copy parla di **“Repository disponibili”**, mai di progetti completati.
- PDF, risorse esterne e GitHub sono link riconoscibili, con destinazione chiara. Il PDF usa il `file_path` disponibile; il link di download usa lo stesso file. Gli avatar mancanti hanno un fallback testuale o grafico semplice.
- Il Markdown delle descrizioni va reso leggibile e sicuro, senza eseguire HTML non attendibile. Preservare la gerarchia di titoli, liste, link e blocchi di codice.
- Focus visibile, etichette dei controlli, contrasto verificato nei due temi, aree cliccabili comode e ordine di lettura coerente sono parte del design. Nessuna informazione dipende solo da colore, hover o animazione.
- Limitare il movimento a transizioni CSS brevi per hover, focus e apertura del menu. Un lieve fade in può accompagnare l'ingresso di contenuti solo se resta semplice; rispettare `prefers-reduced-motion`. Niente librerie di motion o animazioni complesse per l'MVP.

## Limiti dei dati e verifica del design

Il catalogo documentato contiene 15 studenti, 15 progetti da React in poi, 18 PDF, 17 risorse e 124 repository pubbliche verificate; i numeri mostrati dall'app provengono da `/api/stats`, non da costanti nel frontend. L'API espone anche `/api/topics`, `/api/projects`, `/api/students`, `/api/cheatsheets` e `/api/resources` con i dettagli previsti dal contratto. Non inventare date didattiche, percentuali di completamento, competenze certificate, commit, bio, immagini dei progetti o collegamenti diretti topic–materiale. Le possibilità descritte in `PLAN.md` oltre l'MVP restano future.

Prima di considerare pronta una pagina, verificare che:

1. Titolo, azione principale e posizione nella navigazione si capiscano a colpo d'occhio.
2. I collegamenti tra argomento, progetto, studente e materiali siano coerenti con la risposta API e con il loro significato.
3. La pagina funzioni su desktop e mobile, con tastiera, temi chiaro/scuro e contenuti più lunghi del previsto.
4. Stati di caricamento, assenza di dati, errore e 404 siano chiari senza aggiungere pannelli o controlli superflui.
5. Il design resti ordinato anche togliendo ombre e animazioni.

Riferimenti: [API e semantica dei dati](docs/API-CONTRACT.md), [fasi frontend](KANBAN.md), [visione del prodotto](PLAN.md), [Vega di shadcn/ui](https://ui.shadcn.com/docs/changelog/2025-12-shadcn-create), [token semantici shadcn/ui](https://ui.shadcn.com/docs/theming).
