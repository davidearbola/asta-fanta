# Fantacalcio Auction Assistant

Web app mobile-first per gestire un'asta Classic a 8 partecipanti. Funziona interamente nel browser, usa il dataset statico dello SPEC dell'11 settembre 2026 e conserva l'asta in `localStorage`.

## Funzioni

- Asta Live ottimizzata per ricerca, filtri e registrazione rapida.
- Budget, slot, spesa per ruolo e massimo rilancio aggiornati in tempo reale.
- Target, tetto, piano, FVM, QA, titolarità, piazzati, modificatore e salute per 137 giocatori.
- Wishlist completa, Scommesse, Infortuni, Aggiornamenti, Dashboard e Mia Rosa.
- Stati disponibile / mio / avversario, preferiti, note e modifica acquisti.
- Backup JSON, import validato, recupero da `localStorage` corrotto e reset protetto.
- Hash routing e asset relativi, compatibili con qualsiasi nome repository GitHub Pages.

## Struttura

```text
src/
├─ components/   componenti operativi e scheda azioni
├─ data/         configurazione e seed statici
├─ router/       hash router
├─ stores/       store Pinia e persistenza
├─ types/        tipi di dominio
├─ utils/        calcoli puri, storage e backup
└─ views/        tutte le schermate
```

La chiave persistita è `fanta-auction:v1:state`. Il `seedVersion` è separato dallo stato: aggiornare il seed nel repository non cancella acquisti e prezzi già salvati.

## Sviluppo

Richiede Node.js 22.

```bash
npm install
npm run dev
```

Verifiche:

```bash
npm run typecheck
npm run test
npm run build
npm run preview
```

La build production viene creata in `dist/`.

## Deploy su GitHub Pages

1. Crea un nuovo repository su GitHub, senza necessità di scegliere un nome specifico.
2. Inizializza Git e pubblica il progetto sul branch `main`:

   ```bash
   git init
   git add .
   git commit -m "Initial Fantacalcio Auction Assistant"
   git branch -M main
   git remote add origin https://github.com/TUO-UTENTE/NOME-REPOSITORY.git
   git push -u origin main
   ```

3. Su GitHub apri **Settings → Pages**.
4. In **Build and deployment → Source** seleziona **GitHub Actions**.
5. Apri la tab **Actions** e attendi il completamento di “Deploy to GitHub Pages”. Il workflow esegue test, build e pubblicazione di `dist`.
6. L'URL finale compare nel job `deploy` e in **Settings → Pages**; normalmente è `https://TUO-UTENTE.github.io/NOME-REPOSITORY/`.

Il progetto usa `base: './'` in Vite e `createWebHashHistory()`, quindi non richiede configurazioni aggiuntive o redirect per i refresh.

## Backup e sicurezza dei dati

Da **Impostazioni** puoi esportare un file `fantacalcio-asta-backup-YYYY-MM-DD-HHmm.json`. L'import chiede conferma e valida la struttura prima di sostituire lo stato locale. Il reset richiede di digitare `RESET ASTA`.

I dati restano legati al browser e al dispositivo: esporta un backup prima di cancellare dati del sito o cambiare telefono.

## Decisioni tecniche

- “Dashboard” e “Mia Rosa” hanno rotte dedicate, pur restando raggiungibili rapidamente da Asta Live.
- Target e tetto sono avvisi strategici, non blocchi. Viene bloccato solo un prezzo che impedirebbe di completare la rosa a 1 credito per slot.
- “Ripristina dati iniziali” azzera lo stato locale ma non modifica il seed statico incluso nel progetto.
- La PWA opzionale non è stata aggiunta: evita una dipendenza e un service worker non necessari, mantenendo deploy e aggiornamenti del seed più prevedibili.
