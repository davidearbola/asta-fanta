<script setup lang="ts">
import { computed, ref } from 'vue'
import { players } from '@/data/players'
import type { HealthStatus, Player } from '@/types'
import HealthBadge from '@/components/HealthBadge.vue'
import PlayerActionSheet from '@/components/PlayerActionSheet.vue'

const filter = ref<HealthStatus | 'all'>('all')
const selected = ref<Player | null>(null)
const order: Record<HealthStatus, number> = { ROSSO: 0, GIALLO: 1, VERDE: 2, OK: 3 }
const injured = computed(() => players.filter((player) => player.health !== 'OK' && (filter.value === 'all' || player.health === filter.value)).sort((a, b) => order[a.health] - order[b.health] || a.rank - b.rank))
</script>

<template>
  <div class="page-stack">
    <header class="page-heading"><div><h1>Infortuni</h1><p>Rischio fisico, tempi e prezzo sostenibile.</p></div><span class="count-chip">{{ injured.length }} casi</span></header>
    <div class="quick-filters injury-tabs"><button v-for="item in ['all','ROSSO','GIALLO','VERDE'] as const" :key="item" :class="{ active: filter === item }" @click="filter = item">{{ item === 'all' ? 'Tutti' : item }}</button></div>
    <section class="injury-list">
      <article v-for="player in injured" :key="player.id" :class="`injury-${player.health.toLowerCase()}`">
        <header><div><span class="role-token" :class="`role-${player.role.toLowerCase()}`">{{ player.role }}</span><div><strong>{{ player.name }}</strong><small>{{ player.team }} · {{ player.slot }}</small></div></div><HealthBadge :status="player.health" /></header>
        <h2>{{ player.returnStatus }}</h2><p>{{ player.advice }}</p>
        <footer><div><span>Target <b>{{ player.target }}</b></span><span>Tetto <b>{{ player.cap }}</b></span></div><a v-if="player.healthSource" :href="player.healthSource" target="_blank" rel="noreferrer">Fonte</a><button type="button" @click="selected = player">Azioni</button></footer>
      </article>
    </section>
    <PlayerActionSheet v-if="selected" :player="selected" @close="selected = null" />
  </div>
</template>
