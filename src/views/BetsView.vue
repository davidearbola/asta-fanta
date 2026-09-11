<script setup lang="ts">
import { computed, ref } from 'vue'
import { players } from '@/data/players'
import type { Player, Role } from '@/types'
import { matchesSearch } from '@/utils/auction'
import PlayerActionSheet from '@/components/PlayerActionSheet.vue'

const query = ref('')
const role = ref<Role | 'all'>('all')
const selected = ref<Player | null>(null)
const bets = computed(() => players.filter((player) => player.isBet && matchesSearch(player, query.value) && (role.value === 'all' || player.role === role.value)).sort((a, b) => a.role.localeCompare(b.role) || a.rank - b.rank))
</script>

<template>
  <div class="page-stack">
    <header class="page-heading"><div><h1>Scommesse</h1><p>Upside sì, ma il cap resta rigido.</p></div><span class="count-chip">{{ bets.length }} nomi</span></header>
    <section class="filter-panel compact-filter"><label class="search-field"><span class="sr-only">Cerca scommessa</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg><input v-model="query" type="search" placeholder="Cerca una scommessa…" /></label><div class="quick-filters"><button v-for="item in ['all','P','D','C','A'] as const" :key="item" :class="{ active: role === item }" @click="role = item">{{ item === 'all' ? 'Tutti' : item }}</button></div></section>
    <section class="bet-rules">
      <article v-for="player in bets" :key="player.id">
        <div><span class="role-token" :class="`role-${player.role.toLowerCase()}`">{{ player.role }}</span><div><strong>{{ player.name }}</strong><small>{{ player.team }} · {{ player.slot }}</small></div></div>
        <p>{{ player.betReason }}</p><div class="bet-cap"><span>Target <b>{{ player.target }}</b></span><span>Tetto rigido <b>{{ player.cap }}</b></span></div>
        <footer><span>{{ player.betRule }}</span><button type="button" @click="selected = player">Azioni</button></footer>
      </article>
    </section>
    <PlayerActionSheet v-if="selected" :player="selected" @close="selected = null" />
  </div>
</template>
