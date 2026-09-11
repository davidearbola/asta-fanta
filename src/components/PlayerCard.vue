<script setup lang="ts">
import type { AuctionPlayerStatus, Player } from '@/types'
import HealthBadge from './HealthBadge.vue'
import PlanBadge from './PlanBadge.vue'

defineProps<{ player: Player; status: AuctionPlayerStatus; favorite: boolean; price?: number }>()
const emit = defineEmits<{ select: []; favorite: [] }>()
</script>

<template>
  <article class="player-card" :class="[`status-${status}`, { 'long-stop': player.health === 'ROSSO' }]">
    <button class="player-main" type="button" @click="emit('select')">
      <div class="player-heading">
        <span class="role-token" :class="`role-${player.role.toLowerCase()}`">{{ player.role }}</span>
        <div><strong>{{ player.name }}</strong><small>{{ player.team }} · #{{ player.rank }} · {{ player.slot }}</small></div>
        <span v-if="status !== 'available'" class="status-chip" :class="`status-${status}`">{{ status === 'mine' ? `Mio${price ? ` · ${price}` : ''}` : 'Avversario' }}</span>
      </div>
      <div class="player-tags"><PlanBadge :plan="player.plan" /><HealthBadge :status="player.health" /><span v-if="player.modifierFit">MOD {{ player.modifierFit }}</span></div>
      <div class="player-values">
        <span><small>QA</small><b>{{ player.qa }}</b></span>
        <span><small>FVM</small><b>{{ player.fvm }}</b></span>
        <span class="target-value"><small>Target</small><b>{{ player.target }}</b></span>
        <span class="cap-value"><small>Tetto</small><b>{{ player.cap }}</b></span>
      </div>
      <p>{{ player.advice }}</p>
      <span class="open-action">Apri azioni <b>→</b></span>
    </button>
    <button class="favorite-button" type="button" :aria-label="favorite ? `Rimuovi ${player.name} dai preferiti` : `Aggiungi ${player.name} ai preferiti`" :aria-pressed="favorite" @click="emit('favorite')">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/></svg>
    </button>
  </article>
</template>
