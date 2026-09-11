<script setup lang="ts">
import type { HealthStatus } from '@/types'
defineProps<{ status: HealthStatus }>()
</script>

<template><span class="health-badge" :class="`health-${status.toLowerCase()}`"><i aria-hidden="true" />{{ status }}</span></template>
