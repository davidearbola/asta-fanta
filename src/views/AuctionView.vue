<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { players } from '@/data/players'
import { useAuctionStore } from '@/stores/auction'
import type { Player, PlayerSort, Role } from '@/types'
import { matchesSearch } from '@/utils/auction'
import { matchesPlan, sortPlayers } from '@/utils/players'
import BudgetByRole from '@/components/BudgetByRole.vue'
import KpiStrip from '@/components/KpiStrip.vue'
import PlayerActionSheet from '@/components/PlayerActionSheet.vue'
import PlayerCard from '@/components/PlayerCard.vue'
import PlayerFilters from '@/components/PlayerFilters.vue'

const store = useAuctionStore()
const query = ref('')
const role = ref<Role | 'all'>(store.state.ui.liveRole)
const quick = ref<'all' | 'A' | 'BC' | 'bet' | 'injured'>('all')
const sort = ref<PlayerSort>('rank')
const onlyAvailable = ref(store.state.ui.onlyAvailable)
const selected = ref<Player | null>(null)

const filtered = computed(() => sortPlayers(players.filter((player) =>
  matchesSearch(player, query.value)
  && (role.value === 'all' || player.role === role.value)
  && (quick.value === 'injured' ? player.health !== 'OK' : matchesPlan(player, quick.value))
  && (!onlyAvailable.value || store.playerStatus(player.id) === 'available')
), sort.value))

function setRole(value: Role | 'all') {
  role.value = value
  store.state.ui.liveRole = value
}

function onShortcut(event: KeyboardEvent) {
  if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)) {
    event.preventDefault()
    document.querySelector<HTMLInputElement>('.search-field input')?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onShortcut))
onBeforeUnmount(() => window.removeEventListener('keydown', onShortcut))
</script>

<template>
  <div class="live-view">
    <KpiStrip />
    <BudgetByRole />
    <PlayerFilters :query="query" :role="role" :sort="sort" @update:query="query = $event" @update:role="setRole" @update:sort="sort = $event" />
    <section class="live-quickbar" aria-label="Filtri strategici">
      <button v-for="item in [{v:'all',l:'Tutti i piani'},{v:'A',l:'Piano A'},{v:'BC',l:'Piano B/C'},{v:'bet',l:'Scommesse'},{v:'injured',l:'Infortunati'}]" :key="item.v" type="button" :class="{ active: quick === item.v }" @click="quick = item.v as typeof quick">{{ item.l }}</button>
      <label><input v-model="onlyAvailable" type="checkbox" @change="store.state.ui.onlyAvailable = onlyAvailable" /> Solo disponibili</label>
    </section>
    <div class="results-heading"><h1>Giocatori</h1><span>{{ filtered.length }} risultati</span></div>
    <section v-if="filtered.length" class="live-player-list">
      <PlayerCard v-for="player in filtered" :key="player.id" :player="player" :status="store.playerStatus(player.id)" :price="store.purchaseMap.get(player.id)?.price" :favorite="store.state.favoritePlayerIds.includes(player.id)" @select="selected = player" @favorite="store.toggleFavorite(player.id)" />
    </section>
    <div v-else class="empty-state"><strong>Nessun giocatore trovato</strong><p>Prova a cambiare ricerca o filtri.</p></div>
    <PlayerActionSheet v-if="selected" :player="selected" @close="selected = null" />
  </div>
</template>
