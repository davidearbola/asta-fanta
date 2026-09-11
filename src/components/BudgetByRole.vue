<script setup lang="ts">
import { leagueConfig, roleNames, roles } from '@/data/config'
import { useAuctionStore } from '@/stores/auction'
const store = useAuctionStore()
</script>

<template>
  <section class="role-budget" aria-label="Budget per reparto">
    <article v-for="role in roles" :key="role">
      <header><span class="role-token" :class="`role-${role.toLowerCase()}`">{{ role }}</span><strong>{{ roleNames[role] }}</strong><b>{{ store.spentByRole[role] }}/{{ leagueConfig.budgetTargets[role] }}</b></header>
      <div class="budget-track"><i :style="{ width: `${Math.min(100, store.spentByRole[role] / leagueConfig.budgetTargets[role] * 100)}%` }" /></div>
      <footer><span>{{ store.purchasesByRole[role] }}/{{ leagueConfig.roster[role] }} slot</span><span>restano {{ Math.max(0, leagueConfig.budgetTargets[role] - store.spentByRole[role]) }}</span><span>range {{ leagueConfig.budgetRanges[role][0] }}–{{ leagueConfig.budgetRanges[role][1] }}</span></footer>
    </article>
  </section>
</template>
