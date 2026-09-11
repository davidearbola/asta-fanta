<script setup lang="ts">
import { leagueConfig } from '@/data/config'
import { useAuctionStore } from '@/stores/auction'

const store = useAuctionStore()
</script>

<template>
  <section class="kpi-strip" aria-label="Stato del budget">
    <div><small>Budget</small><strong>{{ leagueConfig.budget }}</strong></div>
    <div><small>Speso</small><strong>{{ store.spent }}</strong></div>
    <div class="kpi-primary"><small>Residuo</small><strong>{{ store.remainingBudget }}</strong></div>
    <div><small>Slot</small><strong>{{ 25 - store.remainingSlots }}/25</strong></div>
    <div class="kpi-max"><small>Max prossimo</small><strong>{{ store.maxTheoreticalBid }}</strong></div>
  </section>
</template>
