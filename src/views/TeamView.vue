<script setup lang="ts">
import { ref } from 'vue'
import { leagueConfig, roleNames, roles } from '@/data/config'
import { useAuctionStore } from '@/stores/auction'
import type { Player } from '@/types'
import KpiStrip from '@/components/KpiStrip.vue'
import PlayerActionSheet from '@/components/PlayerActionSheet.vue'

const store = useAuctionStore()
const selected = ref<Player | null>(null)
</script>

<template>
  <div class="page-stack">
    <KpiStrip />
    <header class="page-heading"><div><h1>Mia Rosa</h1><p>Acquisti divisi per ruolo, prezzo e nota.</p></div><RouterLink class="primary-link" to="/">Aggiungi dall’asta</RouterLink></header>
    <section class="team-sections">
      <article v-for="role in roles" :key="role">
        <header><div><span class="role-token" :class="`role-${role.toLowerCase()}`">{{ role }}</span><h2>{{ roleNames[role] }}</h2></div><strong>{{ store.purchasesByRole[role] }}/{{ leagueConfig.roster[role] }} · {{ store.spentByRole[role] }} crediti</strong></header>
        <div v-if="store.myPlayers.filter(player => player.role === role).length" class="team-list">
          <button v-for="player in store.myPlayers.filter(item => item.role === role)" :key="player.id" type="button" @click="selected = player">
            <span><strong>{{ player.name }}</strong><small>{{ player.team }} · {{ store.purchaseMap.get(player.id)?.slot || player.slot }}</small></span>
            <span class="team-note">{{ store.purchaseMap.get(player.id)?.note || 'Nessuna nota' }}</span>
            <b>{{ store.purchaseMap.get(player.id)?.price }}</b>
          </button>
        </div>
        <div v-else class="team-empty">{{ leagueConfig.roster[role] }} slot ancora liberi</div>
      </article>
    </section>
    <PlayerActionSheet v-if="selected" :player="selected" @close="selected = null" />
  </div>
</template>
