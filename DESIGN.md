---
name: Fantacalcio Auction Assistant
description: Un tabellone operativo mobile-first per decisioni d'asta rapide e disciplinate.
colors:
  ink: "#10233e"
  ink-soft: "#2b4261"
  field: "#0d744c"
  field-dark: "#07573a"
  stop: "#de3e3e"
  attention: "#b56b00"
  paper: "#ffffff"
  ground: "#edf1f5"
  line: "#d4dce5"
  muted: "#627087"
typography:
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(25px, 4vw, 38px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 800
rounded:
  sm: "8px"
  md: "10px"
  surface: "14px"
spacing:
  xs: "5px"
  sm: "9px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.field}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "0 18px"
    height: "44px"
  player-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "14px"
  search-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    height: "56px"
---

# Design System: Fantacalcio Auction Assistant

## Overview

**Creative North Star: "Il Tabellone Cambio"**

Il sistema traduce la chiarezza di un tabellone da bordo campo in un'interfaccia operativa: cifre stabili, soglie leggibili e azioni che non richiedono interpretazione. È denso quando deve confrontare giocatori e quieto quando chiede una decisione.

La personalità viene dal contrasto tra blu inchiostro, superfici fredde e indicatori funzionali. Verde e rosso non decorano: distinguono conferma, target e stop, sempre insieme a testo esplicito.

**Key Characteristics:**

- Numeri tabulari grandi nei punti decisionali.
- Densità mobile controllata e navigazione raggiungibile col pollice.
- Target e Tetto sempre presentati come coppia.
- Stato espresso con colore, testo e forma.

## Colors

Una strategia restrained: blu inchiostro e neutri freddi dominano; verde campo, ambra e rosso compaiono solo per stato o azione.

### Primary

- **Blu Tabellone** (#10233e): navigazione, KPI e controlli selezionati.
- **Verde Campo** (#0d744c): budget residuo, azione primaria e prezzo entro target.

### Secondary

- **Rosso Stop** (#de3e3e): tetto, pericolo e condizioni rosse.
- **Ambra Attenzione** (#b56b00): prezzo intermedio e ruoli/condizioni che richiedono cautela.

### Neutral

- **Carta Fredda** (#ffffff): contenuti e controlli.
- **Terreno Freddo** (#edf1f5): sfondo generale.
- **Linea** (#d4dce5): separazioni e controlli secondari.
- **Testo Secondario** (#627087): metadati, mai informazioni critiche isolate.

**La regola del segnale.** Verde, ambra e rosso compaiono solo con una conseguenza operativa e sono sempre accompagnati da una parola o un numero esplicito.

## Typography

**Display Font:** stack sans-serif di sistema
**Body Font:** stack sans-serif di sistema
**Label Font:** stack sans-serif di sistema

**Character:** Un solo carattere workhorse riduce dipendenze e variabilità offline. Gerarchia e numeri tabulari, non un secondo font, creano la voce da tabellone.

### Hierarchy

- **Headline** (800, 25–38px, 1.05): titoli pagina compatti.
- **Title** (800, 18–24px): nomi giocatore e titoli di sezione.
- **Body** (400, 13–16px, 1.4–1.45): consigli e spiegazioni, massimo 70ch.
- **Label** (800–900, 9–12px): KPI, badge e metadati.
- **Measurement** (800–900, 18–34px): budget, prezzi e slot con cifre tabulari.

**La regola del numero stabile.** Budget, prezzo, target, tetto e slot usano sempre `font-variant-numeric: tabular-nums`.

## Layout

Mobile è il riferimento: contenuto a una colonna con 10–18px di ritmo, KPI sticky, griglie reparto a due colonne e action sheet ancorato in basso. Da 720px le liste specialistiche passano a due colonne; da 1040px la bottom navigation diventa sidebar da 232px, la wishlist diventa tabella e Asta Live usa tre o quattro colonne. Il contenuto è limitato a 1500px.

## Elevation & Depth

Le superfici usano profondità ambientale leggera, mai bordi e ombre insieme come ornamento.

### Shadow Vocabulary

- **Ambient surface** (`0 10px 26px rgba(16, 35, 62, .09)`): pannelli principali, campi e viste aggregate.
- **Compact surface** (`0 5px 18px rgba(16,35,62,.07)`): player card e righe specialistiche.

## Shapes

Le superfici principali hanno raggio 14px; controlli e campi 8–10px; pillole sono riservate a filtri, badge e stati. I token ruolo sono quadrati arrotondati da 28px. Le aree dense usano divisori sottili anziché contenitori annidati.

## Components

### Buttons

- **Shape:** raggio 8–10px e altezza minima 44px.
- **Primary:** verde campo con testo bianco; hover verde scuro.
- **Focus:** anello blu da 3px con offset di 2px.
- **Secondary:** fondo neutro freddo, senza ombra.

### Chips

- **Style:** pillole compatte con testo forte; piano, salute e stato hanno famiglie tonali distinte.
- **State:** i filtri selezionati passano a blu inchiostro; salute mantiene sempre testo e punto.

### Cards / Containers

- **Corner Style:** 14px.
- **Background:** carta fredda; rosso e giallo usano solo leggere superfici tonali nei casi clinici.
- **Shadow Strategy:** ambientale, senza bordo concorrente.
- **Internal Padding:** 12–18px.

### Inputs / Fields

- **Style:** fondo bianco, bordo neutro e raggio 9–14px.
- **Focus:** bordo blu e anello globale visibile.
- **Error / Disabled:** superficie rossa testuale; azioni distruttive disabilitate diventano grigie.

### Navigation

Sidebar blu su desktop e rail inferiore blu su mobile. Lo stato attivo usa un campo blu più chiaro e una linea verde; etichetta testuale sempre presente.

### KPI Strip

Cinque celle stabili: Budget, Speso, Residuo, Slot e Max prossimo. Residuo è verde; Max prossimo è blu più chiaro. Rimane sticky perché governa ogni acquisto.

### Player Card

Ruolo e identità aprono la scheda; badge e quattro misure seguono; Target verde e Tetto rosso sono adiacenti. La stella preferito resta un'azione indipendente.

## Do's and Don'ts

### Do:

- **Do** mantenere Target e Tetto affiancati e più evidenti di QA/FVM.
- **Do** usare tap target di almeno 44px per azioni primarie e filtri.
- **Do** adattare card mobile a tabella desktop senza cambiare la gerarchia informativa.
- **Do** mostrare l'effetto matematico prima di confermare un acquisto.

### Don't:

- **Don't** usare il colore come unico segnale di salute, prezzo o stato.
- **Don't** introdurre illustrazioni, gradienti, vetro o animazioni che competano con la lettura.
- **Don't** trasformare target e budget reparto in blocchi: solo il limite matematico è vincolante.
- **Don't** annidare pannelli decorativi dentro altri pannelli.
