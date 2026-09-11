---
version: 1
slug: "src-views-auctionview-vue"
primary_target: "src/views/AuctionView.vue"
related_targets: ["src/components/KpiStrip.vue","src/components/PlayerCard.vue","src/components/PlayerActionSheet.vue"]
---

## Scope and mode

Primary surface: `src/views/AuctionView.vue`. Mode: Operate.

## Audience, job and action

Un fantallenatore usa soprattutto il telefono durante un'asta rapida. Deve trovare un nome, leggere target/tetto/salute, inserire il prezzo e registrare l'esito in pochi secondi, senza perdere controllo su budget e slot.

## Content and constraints

Il seed statico dello SPEC è l'unica fonte dati. KPI, ricerca e azioni restano prioritari; nessuna decorazione può oscurare stato o vincoli matematici. Desktop amplia densità e navigazione, mobile usa bottom navigation e action sheet.

## Direction and memorable moment

Tabellone cambio da stadio: budget residuo e massimo rilancio funzionano come cifre operative stabili, mentre Target verde e Tetto rosso compaiono affiancati in ogni giocatore. Il momento memorabile è l'impatto immediato dell'acquisto su KPI e slot.

## Implementation inventory

- KPI sticky: HTML/CSS, cinque celle numeriche a contrasto alto.
- Budget ruolo: HTML/CSS, quattro pannelli con barra, speso/target, residuo target, slot e range.
- Ricerca e filtri: controlli semantici, barre orizzontali scorrevoli su mobile.
- Player card/table: card mobile, tabella desktop, stessi dati e stati.
- Azione primaria: action sheet semantico con prezzo, scorciatoie Target/Tetto/Max e messaggio prezzo.
- Navigazione: sidebar desktop e bottom rail mobile.

## Unresolved decisions

Nessuna. La PWA resta esplicitamente fuori dall'MVP per semplicità e affidabilità.
