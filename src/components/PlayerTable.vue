<script setup lang="ts">
import type { Player } from '@/types'
import { useAuctionStore } from '@/stores/auction'
import HealthBadge from './HealthBadge.vue'
import PlanBadge from './PlanBadge.vue'
import PlayerCard from './PlayerCard.vue'

defineProps<{ players: Player[] }>()
const emit = defineEmits<{ select: [player: Player] }>()
const store = useAuctionStore()
</script>

<template>
  <div class="mobile-player-list">
    <PlayerCard v-for="player in players" :key="player.id" :player="player" :status="store.playerStatus(player.id)" :price="store.purchaseMap.get(player.id)?.price" :favorite="store.state.favoritePlayerIds.includes(player.id)" @select="emit('select', player)" @favorite="store.toggleFavorite(player.id)" />
  </div>
  <div class="player-table-wrap">
    <table class="player-table">
      <thead><tr><th>Giocatore</th><th>Piano / Salute</th><th>QA</th><th>FVM</th><th>Target</th><th>Tetto</th><th>Stato</th><th><span class="sr-only">Azioni</span></th></tr></thead>
      <tbody>
        <tr v-for="player in players" :key="player.id" :class="{ 'row-red': player.health === 'ROSSO' }">
          <td><div class="table-player"><span class="role-token" :class="`role-${player.role.toLowerCase()}`">{{ player.role }}</span><div><strong>{{ player.name }}</strong><small>{{ player.team }} · #{{ player.rank }} · {{ player.slot }}</small></div></div></td>
          <td><div class="table-badges"><PlanBadge :plan="player.plan" /><HealthBadge :status="player.health" /></div></td>
          <td>{{ player.qa }}</td><td>{{ player.fvm }}</td><td class="target-cell">{{ player.target }}</td><td class="cap-cell">{{ player.cap }}</td>
          <td><span class="status-chip" :class="`status-${store.playerStatus(player.id)}`">{{ store.playerStatus(player.id) === 'available' ? 'Disponibile' : store.playerStatus(player.id) === 'mine' ? `Mio · ${store.purchaseMap.get(player.id)?.price}` : 'Avversario' }}</span></td>
          <td><div class="table-actions"><button type="button" @click="store.toggleFavorite(player.id)" :aria-label="`Preferito ${player.name}`" :aria-pressed="store.state.favoritePlayerIds.includes(player.id)">Pref.</button><button type="button" @click="emit('select', player)">Azioni</button></div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
