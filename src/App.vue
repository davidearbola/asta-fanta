<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNav from '@/components/AppNav.vue'

const route = useRoute()
const title = computed(() => String(route.meta.title ?? 'Fanta Asta'))
</script>

<template>
  <div class="app-shell">
    <AppNav />
    <div class="app-column">
      <header class="app-topbar">
        <div>
          <span class="brand-mark">FA</span>
          <strong>{{ title }}</strong>
        </div>
        <span class="live-indicator"><i aria-hidden="true" /> Offline-first</span>
      </header>
      <main id="main-content" class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
