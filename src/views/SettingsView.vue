<script setup lang="ts">
import { ref } from 'vue'
import { leagueConfig, SEED_VERSION } from '@/data/config'
import { players } from '@/data/players'
import { useAuctionStore } from '@/stores/auction'
import { backupFileName } from '@/utils/backup'

const store = useAuctionStore()
const message = ref('')
const error = ref('')
const resetText = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

function exportState() {
  const blob = new Blob([store.exportBackup()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = backupFileName()
  anchor.click()
  URL.revokeObjectURL(url)
  message.value = 'Backup esportato.'
  error.value = ''
}

async function importState(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  error.value = ''
  message.value = ''
  try {
    const json = await file.text()
    if (!window.confirm('Importare questo backup? Lo stato locale attuale verrà sostituito.')) return
    store.importBackup(json)
    message.value = 'Backup importato correttamente.'
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Importazione non riuscita.'
  } finally {
    if (fileInput.value) fileInput.value.value = ''
  }
}

function resetAuction() {
  if (resetText.value !== 'RESET ASTA') return
  store.resetAuction()
  resetText.value = ''
  message.value = 'Asta azzerata. Il seed giocatori è rimasto intatto.'
  error.value = ''
}

function restoreDefaults() {
  if (!window.confirm('Ripristinare lo stato iniziale e tutte le preferenze?')) return
  store.resetAuction()
  message.value = 'Dati iniziali ripristinati.'
}
</script>

<template>
  <div class="page-stack settings-page">
    <header class="page-heading"><div><h1>Impostazioni e backup</h1><p>I dati restano in questo browser finché non li esporti o li resetti.</p></div></header>
    <p v-if="message" class="notice-success" role="status">{{ message }}</p><p v-if="error" class="form-error" role="alert">{{ error }}</p>
    <section class="settings-section"><div><h2>Backup JSON</h2><p>Salva una copia completa di acquisti, avversari, note e preferiti.</p></div><div class="settings-actions"><button class="primary-button" type="button" @click="exportState">Esporta backup</button><label class="secondary-button">Importa backup<input ref="fileInput" class="sr-only" type="file" accept="application/json,.json" @change="importState" /></label></div></section>
    <section class="settings-section"><div><h2>Configurazione lega</h2><p>{{ leagueConfig.participants }} partecipanti · {{ leagueConfig.mode }} · modificatore difesa {{ leagueConfig.defenseModifier ? 'attivo' : 'disattivo' }}</p></div><dl class="config-list"><div><dt>Budget</dt><dd>{{ leagueConfig.budget }}</dd></div><div><dt>Rosa</dt><dd>P{{ leagueConfig.roster.P }} · D{{ leagueConfig.roster.D }} · C{{ leagueConfig.roster.C }} · A{{ leagueConfig.roster.A }}</dd></div><div><dt>Offerta minima</dt><dd>{{ leagueConfig.minimumBid }}</dd></div></dl></section>
    <section class="settings-section"><div><h2>Dataset</h2><p>Seed statico incluso nel progetto. Gli aggiornamenti futuri non cancellano automaticamente l’asta locale.</p></div><dl class="config-list"><div><dt>Versione</dt><dd>{{ SEED_VERSION }}</dd></div><div><dt>Giocatori</dt><dd>{{ players.length }}</dd></div></dl><button class="secondary-button" type="button" @click="restoreDefaults">Ripristina dati iniziali</button></section>
    <section class="settings-section danger-zone"><div><h2>Reset asta</h2><p>Elimina acquisti, prezzi, avversari, note e preferiti. Scrivi <strong>RESET ASTA</strong> per confermare.</p></div><div class="reset-controls"><input v-model="resetText" type="text" placeholder="RESET ASTA" aria-label="Testo di conferma reset" /><button type="button" :disabled="resetText !== 'RESET ASTA'" @click="resetAuction">Azzera l’asta</button></div></section>
  </div>
</template>
