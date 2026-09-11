<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import { leagueConfig } from '@/data/config'
import { useAuctionStore } from '@/stores/auction'
import type { Player } from '@/types'
import { priceSignal } from '@/utils/auction'
import HealthBadge from './HealthBadge.vue'

const props = defineProps<{ player: Player }>()
const emit = defineEmits<{ close: [] }>()
const store = useAuctionStore()
const current = computed(() => store.purchaseMap.get(props.player.id))
const other = computed(() => store.otherMap.get(props.player.id))
const mode = ref<'mine' | 'other'>(store.playerStatus(props.player.id) === 'other' ? 'other' : 'mine')
const price = ref(String(current.value?.price ?? other.value?.price ?? ''))
const slot = ref(current.value?.slot ?? props.player.slot)
const note = ref(current.value?.note ?? other.value?.note ?? '')
const error = ref('')
const priceNumber = computed(() => Number(price.value))
const signal = computed(() => Number.isFinite(priceNumber.value) && priceNumber.value > 0 ? priceSignal(props.player, priceNumber.value) : null)
const maxAllowed = computed(() => current.value ? store.remainingBudget + current.value.price - store.remainingSlots * leagueConfig.minimumBid : store.maxTheoreticalBid)

function chooseMode(value: 'mine' | 'other') {
  mode.value = value
  error.value = ''
  nextTick(() => document.querySelector<HTMLInputElement>('#auction-price')?.focus())
}

function save() {
  error.value = ''
  try {
    if (mode.value === 'mine') {
      if (!Number.isInteger(priceNumber.value) || priceNumber.value < 1) throw new Error('Inserisci un prezzo intero di almeno 1 credito.')
      if (current.value) store.updatePurchase(props.player.id, { price: priceNumber.value, note: note.value.trim() || undefined, slot: slot.value.trim() || undefined })
      else store.buyPlayer(props.player.id, priceNumber.value, note.value, slot.value)
    } else {
      const optionalPrice = price.value.trim() ? priceNumber.value : undefined
      if (optionalPrice !== undefined && (!Number.isInteger(optionalPrice) || optionalPrice < 1)) throw new Error('Il prezzo avversario deve essere un intero positivo.')
      store.markAsOther(props.player.id, optionalPrice, note.value)
    }
    emit('close')
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Impossibile salvare.'
  }
}

function makeAvailable() {
  store.setAvailable(props.player.id)
  emit('close')
}

onMounted(() => document.querySelector<HTMLInputElement>('#auction-price')?.focus())
</script>

<template>
  <Teleport to="body">
    <div class="sheet-backdrop" @click.self="emit('close')">
      <section class="action-sheet" role="dialog" aria-modal="true" :aria-labelledby="`sheet-title-${player.id}`">
        <header class="sheet-header">
          <div><span class="role-token" :class="`role-${player.role.toLowerCase()}`">{{ player.role }}</span><div><h2 :id="`sheet-title-${player.id}`">{{ player.name }}</h2><p>{{ player.team }} · {{ player.slot }} · Piano {{ player.plan }}</p></div></div>
          <button class="icon-button" type="button" aria-label="Chiudi" @click="emit('close')">×</button>
        </header>
        <div class="sheet-thresholds">
          <span><small>Target</small><strong>{{ player.target }}</strong></span>
          <span><small>Tetto</small><strong>{{ player.cap }}</strong></span>
          <span><small>Max sostenibile</small><strong>{{ maxAllowed }}</strong></span>
        </div>
        <div class="sheet-health"><HealthBadge :status="player.health" /><span>{{ player.returnStatus || player.advice }}</span></div>
        <dl class="player-details"><div><dt>Titolarità</dt><dd>{{ player.starter || '—' }}</dd></div><div><dt>Rigori / piazzati</dt><dd>{{ player.setPieces || '—' }}</dd></div><div><dt>Fit modificatore</dt><dd>{{ player.modifierFit || '—' }}</dd></div></dl>
        <div class="mode-switch">
          <button type="button" :class="{ active: mode === 'mine' }" @click="chooseMode('mine')">Comprato da me</button>
          <button type="button" :class="{ active: mode === 'other' }" @click="chooseMode('other')">Preso da altri</button>
        </div>
        <form @submit.prevent="save">
          <label class="field-label">Prezzo {{ mode === 'other' ? '(opzionale)' : '' }}
            <input id="auction-price" v-model="price" inputmode="numeric" min="1" step="1" type="number" :required="mode === 'mine'" placeholder="0" />
          </label>
          <div class="price-shortcuts">
            <button type="button" @click="price = String(player.target)">Target {{ player.target }}</button>
            <button type="button" @click="price = String(player.cap)">Tetto {{ player.cap }}</button>
            <button v-if="mode === 'mine'" type="button" @click="price = String(maxAllowed)">Max {{ maxAllowed }}</button>
          </div>
          <p v-if="signal" class="price-signal" :class="`signal-${signal.tone}`"><strong>{{ signal.tone === 'good' ? 'Buon prezzo' : signal.tone === 'warn' ? 'Attenzione' : 'Stop consigliato' }}</strong>{{ signal.message }}</p>
          <label v-if="mode === 'mine'" class="field-label">Slot (opzionale)<input v-model="slot" type="text" /></label>
          <label class="field-label">Nota (opzionale)<textarea v-model="note" rows="2" placeholder="Copertura, strategia, avversario…" /></label>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
          <button class="primary-button" type="submit">{{ current ? 'Salva modifiche' : mode === 'mine' ? 'Conferma acquisto' : 'Segna come preso' }}</button>
        </form>
        <button v-if="store.playerStatus(player.id) !== 'available'" class="text-danger" type="button" @click="makeAvailable">Segna nuovamente disponibile</button>
      </section>
    </div>
  </Teleport>
</template>
