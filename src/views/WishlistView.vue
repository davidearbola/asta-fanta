<script setup lang="ts">
import { computed, ref } from 'vue'
import { players } from '@/data/players'
import { useAuctionStore } from '@/stores/auction'
import type { HealthStatus, Player, PlayerSort, Role } from '@/types'
import { matchesSearch } from '@/utils/auction'
import { matchesPlan, sortPlayers } from '@/utils/players'
import PlayerActionSheet from '@/components/PlayerActionSheet.vue'
import PlayerFilters from '@/components/PlayerFilters.vue'
import PlayerTable from '@/components/PlayerTable.vue'

const store = useAuctionStore()
const query = ref('')
const role = ref<Role | 'all'>('all')
const plan = ref('all')
const status = ref('all')
const health = ref<HealthStatus | 'all'>('all')
const sort = ref<PlayerSort>('roleRank')
const selected = ref<Player | null>(null)

const filtered = computed(() => sortPlayers(players.filter((player) => {
  const playerStatus = store.playerStatus(player.id)
  const statusMatch = status.value === 'all' || status.value === playerStatus || (status.value === 'favorite' && store.state.favoritePlayerIds.includes(player.id))
  return matchesSearch(player, query.value) && (role.value === 'all' || player.role === role.value) && matchesPlan(player, plan.value) && (health.value === 'all' || player.health === health.value) && statusMatch
}), sort.value))
</script>

<template>
  <div class="page-stack">
    <header class="page-heading"><div><h1>Wishlist completa</h1><p>Tutti i 137 giocatori del seed, senza copie o dati esterni.</p></div><span class="count-chip">{{ filtered.length }} / {{ players.length }}</span></header>
    <PlayerFilters v-model:query="query" v-model:role="role" v-model:plan="plan" v-model:status="status" v-model:health="health" v-model:sort="sort" show-extended />
    <PlayerTable :players="filtered" @select="selected = $event" />
    <div v-if="!filtered.length" class="empty-state"><strong>Nessun risultato</strong><p>Rimuovi uno o più filtri.</p></div>
    <PlayerActionSheet v-if="selected" :player="selected" @close="selected = null" />
  </div>
</template>
