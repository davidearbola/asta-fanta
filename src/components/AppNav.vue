<script setup lang="ts">
const items = [
  { to: '/', short: 'LIVE', label: 'Asta Live' },
  { to: '/dashboard', short: 'KPI', label: 'Dashboard' },
  { to: '/wishlist', short: 'LISTA', label: 'Wishlist' },
  { to: '/bets', short: 'BET', label: 'Scommesse' },
  { to: '/injuries', short: 'CROCE', label: 'Infortuni' },
  { to: '/updates', short: 'NEWS', label: 'Aggiornamenti' },
  { to: '/team', short: 'ROSA', label: 'Mia Rosa' },
  { to: '/settings', short: 'SET', label: 'Impostazioni' },
]
</script>

<template>
  <nav class="app-nav" aria-label="Navigazione principale">
    <div class="nav-brand">
      <span>FA</span>
      <div><strong>Fanta Asta</strong><small>Assistente 2026</small></div>
    </div>
    <div class="nav-links">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to">
        <span aria-hidden="true">{{ item.short }}</span>
        <b>{{ item.label }}</b>
      </RouterLink>
    </div>
  </nav>
</template>
