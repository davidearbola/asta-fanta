# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vue 3, Vite, TypeScript, Pinia, Vue Router con hash history; applicazione interamente statica e deployabile su GitHub Pages.

## Users

Fantallenatore che gestisce in prima persona un'asta Classic a 8 partecipanti, soprattutto da smartphone, in un contesto rapido dove ricerca e registrazione devono richiedere pochi secondi.

## Product Purpose

Sostituire il foglio Excel dell'asta con un assistente locale affidabile che unisce wishlist, consigli, stato fisico e vincoli matematici di budget, senza perdere lo stato dopo un refresh.

## Positioning

La stessa scheda giocatore collega in tempo reale il piano strategico pre-asta (ranking, target, tetto, salute) alle conseguenze operative dell'acquisto (budget residuo, slot e massimo rilancio sostenibile).

## Operating Context

Utilizzo durante l'asta dell'11 settembre 2026, con decisioni frequenti da telefono e consultazione più ampia da desktop. Il seed del file `SPEC_Fantacalcio_Auction_WebApp_Codex.md` è la fonte dati definitiva.

## Capabilities and Constraints

- Nessun backend, database, autenticazione, scraping o API runtime.
- Stato versionato in `localStorage`, backup JSON importabile/esportabile e recupero sicuro da dati corrotti.
- Rosa predefinita P3/D8/C8/A6, budget 500, offerta minima 1, modificatore difesa attivo.
- Acquisti propri e avversari reversibili; gli acquisti propri includono prezzo, slot e nota.
- Il sistema blocca solo gli acquisti matematicamente incompatibili col completamento della rosa; target e tetto restano guide.
- Ricerca immediata, filtri e ordinamenti client-side su tutti i 137 giocatori del seed.

## Brand Commitments

Nome prodotto: Fantacalcio Auction Assistant. Voce concisa e operativa in italiano. Interfaccia pulita e leggibile, senza decorazione che rallenti l'uso.

## Evidence on Hand

- SPEC completo con dataset giocatori e aggiornamenti: `SPEC_Fantacalcio_Auction_WebApp_Codex.md`.
- Nessun altro asset o dato esterno deve essere inventato o richiesto a runtime.

## Product Principles

1. La decisione utile deve essere visibile prima del dettaglio.
2. Ogni azione deve mostrare subito il suo impatto matematico.
3. Lo stato dell'asta deve essere reversibile e resistente ai refresh.
4. Salute, target e tetto devono essere leggibili anche sotto pressione.
5. Un'unica fonte dati alimenta tutte le viste specialistiche.

## Accessibility & Inclusion

Contrasto accessibile, tap target ampi, focus visibile e nessuna informazione affidata esclusivamente al colore.
