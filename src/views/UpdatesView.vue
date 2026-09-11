<script setup lang="ts">
import { updates } from '@/data/updates'
const ordered = [...updates].sort((a, b) => ({ ALTA: 0, MEDIA: 1, NUOVO: 2 }[a.priority] - { ALTA: 0, MEDIA: 1, NUOVO: 2 }[b.priority]))
</script>

<template>
  <div class="page-stack">
    <header class="page-heading"><div><h1>Ultimi aggiornamenti</h1><p>Variazioni integrate nella fotografia dati dell’11 settembre 2026.</p></div><span class="count-chip">{{ updates.length }} update</span></header>
    <section class="updates-list">
      <article v-for="update in ordered" :key="`${update.player}-${update.change}`">
        <header><span class="priority-chip" :class="`priority-${update.priority.toLowerCase()}`">{{ update.priority }}</span><div><strong>{{ update.player }}</strong><small>{{ update.role }}</small></div><div class="update-prices"><span>T {{ update.target }}</span><span>STOP {{ update.cap }}</span></div></header>
        <h2>{{ update.change }}</h2><p>{{ update.auctionAdvice }}</p><a :href="update.source" target="_blank" rel="noreferrer">Apri fonte ↗</a>
      </article>
    </section>
  </div>
</template>
