<script setup lang="ts">
import type { HealthStatus, PlayerSort, Role } from '@/types'

withDefaults(defineProps<{
  query: string
  role: Role | 'all'
  plan?: string
  status?: string
  health?: HealthStatus | 'all'
  sort: PlayerSort
  showExtended?: boolean
}>(), { plan: 'all', status: 'all', health: 'all', showExtended: false })

const emit = defineEmits<{
  'update:query': [value: string]
  'update:role': [value: Role | 'all']
  'update:plan': [value: string]
  'update:status': [value: string]
  'update:health': [value: HealthStatus | 'all']
  'update:sort': [value: PlayerSort]
}>()
</script>

<template>
  <section class="filter-panel">
    <label class="search-field">
      <span class="sr-only">Cerca giocatore, squadra o ruolo</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
      <input :value="query" type="search" autocomplete="off" placeholder="Cerca giocatore, squadra o ruolo…" @input="emit('update:query', ($event.target as HTMLInputElement).value)" />
      <kbd>/</kbd>
    </label>
    <div class="quick-filters" aria-label="Filtra per ruolo">
      <button v-for="item in ['all','P','D','C','A'] as const" :key="item" type="button" :class="{ active: role === item }" @click="emit('update:role', item)">{{ item === 'all' ? 'Tutti' : item }}</button>
    </div>
    <div v-if="showExtended" class="select-filters">
      <label>Piano<select :value="plan" @change="emit('update:plan', ($event.target as HTMLSelectElement).value)"><option value="all">Tutti</option><option value="A">Piano A</option><option value="BC">Piano B/C</option><option value="bet">Scommesse</option><option value="No/Regalo">No/Regalo</option></select></label>
      <label>Stato<select :value="status" @change="emit('update:status', ($event.target as HTMLSelectElement).value)"><option value="all">Tutti</option><option value="available">Disponibili</option><option value="mine">Miei</option><option value="other">Avversari</option><option value="favorite">Preferiti</option></select></label>
      <label>Salute<select :value="health" @change="emit('update:health', ($event.target as HTMLSelectElement).value as HealthStatus | 'all')"><option value="all">Tutte</option><option>OK</option><option>VERDE</option><option>GIALLO</option><option>ROSSO</option></select></label>
      <label>Ordina<select :value="sort" @change="emit('update:sort', ($event.target as HTMLSelectElement).value as PlayerSort)"><option value="roleRank">Ruolo e ranking</option><option value="rank">Ranking</option><option value="fvm">FVM</option><option value="qa">QA</option><option value="target">Target</option><option value="cap">Tetto</option><option value="name">Nome</option></select></label>
    </div>
  </section>
</template>
