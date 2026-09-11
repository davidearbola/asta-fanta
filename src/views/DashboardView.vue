<script setup lang="ts">
import { leagueConfig, roleNames, roles } from '@/data/config'
import { players } from '@/data/players'
import { useAuctionStore } from '@/stores/auction'
import BudgetByRole from '@/components/BudgetByRole.vue'
import KpiStrip from '@/components/KpiStrip.vue'

const store = useAuctionStore()
const reminders = [
  'Il tetto è uno STOP, non un obiettivo.',
  'Con modificatore: quattro difensori forti sono preferibili a un solo supertop più sette tappabuchi.',
  'Se salta un Piano A, passa al Piano B senza rincorrere.',
  'Le scommesse devono avere un cap rigido.',
  'Gialli solo con sconto; rossi solo a prezzo simbolico o regalo.',
  'In attacco preserva sempre budget sufficiente per A2 + A3.',
  'Il budget per ruolo è una guida, non un vincolo.',
]
</script>

<template>
  <div class="page-stack">
    <KpiStrip />
    <header class="page-heading"><div><h1>Quadro dell’asta</h1><p>Budget, composizione e disciplina di reparto in una sola vista.</p></div><RouterLink class="primary-link" to="/">Vai all’asta</RouterLink></header>
    <BudgetByRole />
    <section class="dashboard-grid">
      <article class="roster-board">
        <h2>Composizione rosa</h2>
        <div v-for="role in roles" :key="role" class="roster-line">
          <span class="role-token" :class="`role-${role.toLowerCase()}`">{{ role }}</span>
          <div><strong>{{ roleNames[role] }}</strong><small>{{ store.remainingSlotsByRole[role] }} ancora da acquistare</small></div>
          <b>{{ store.purchasesByRole[role] }}/{{ leagueConfig.roster[role] }}</b>
        </div>
        <RouterLink to="/team">Apri la mia rosa →</RouterLink>
      </article>
      <article class="auction-state">
        <h2>Stato generale</h2>
        <dl><div><dt>Disponibili</dt><dd>{{ store.availablePlayers.length }}</dd></div><div><dt>Presi da me</dt><dd>{{ store.myPlayers.length }}</dd></div><div><dt>Presi dagli altri</dt><dd>{{ store.otherPlayers.length }}</dd></div><div><dt>Preferiti</dt><dd>{{ store.state.favoritePlayerIds.length }}</dd></div><div><dt>Infortunati disponibili</dt><dd>{{ players.filter(p => p.health !== 'OK' && store.playerStatus(p.id) === 'available').length }}</dd></div></dl>
      </article>
    </section>
    <section class="reminders"><h2>Promemoria d’asta</h2><ol><li v-for="item in reminders" :key="item">{{ item }}</li></ol></section>
  </div>
</template>
