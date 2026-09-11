import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { leagueConfig } from '@/data/config'
import { players } from '@/data/players'
import type { AuctionPlayerStatus, OtherPurchase, Purchase } from '@/types'
import { createBackup, parseBackup } from '@/utils/backup'
import { canAffordPurchase, maxTheoreticalBid as getMaxBid, purchasesCountByRole, remainingBudget as getRemainingBudget, remainingSlots as getRemainingSlots, remainingSlotsByRole as getRemainingByRole, spent as getSpent, spentByRole as getSpentByRole } from '@/utils/auction'
import { createInitialState, loadState, saveState } from '@/utils/storage'

export const useAuctionStore = defineStore('auction', () => {
  const state = ref(loadState())

  const spent = computed(() => getSpent(state.value))
  const remainingBudget = computed(() => getRemainingBudget(state.value))
  const remainingSlots = computed(() => getRemainingSlots(state.value))
  const maxTheoreticalBid = computed(() => getMaxBid(state.value))
  const spentByRole = computed(() => getSpentByRole(state.value))
  const purchasesByRole = computed(() => purchasesCountByRole(state.value))
  const remainingSlotsByRole = computed(() => getRemainingByRole(state.value))
  const purchaseMap = computed(() => new Map(state.value.purchases.map((purchase) => [purchase.playerId, purchase])))
  const otherMap = computed(() => new Map(state.value.otherPurchases.map((purchase) => [purchase.playerId, purchase])))
  const availablePlayers = computed(() => players.filter((player) => !purchaseMap.value.has(player.id) && !otherMap.value.has(player.id)))
  const myPlayers = computed(() => players.filter((player) => purchaseMap.value.has(player.id)))
  const otherPlayers = computed(() => players.filter((player) => otherMap.value.has(player.id)))

  function playerStatus(playerId: string): AuctionPlayerStatus {
    if (purchaseMap.value.has(playerId)) return 'mine'
    if (otherMap.value.has(playerId)) return 'other'
    return 'available'
  }

  function buyPlayer(playerId: string, price: number, note?: string, slot?: string): void {
    const player = players.find((candidate) => candidate.id === playerId)
    if (!player) throw new Error('Giocatore non trovato.')
    if (purchaseMap.value.has(playerId)) throw new Error('Il giocatore è già nella tua rosa.')
    if (remainingSlotsByRole.value[player.role] <= 0) throw new Error(`Non hai più slot ${player.role} disponibili.`)
    if (!canAffordPurchase(state.value, price)) throw new Error(`Prezzo non sostenibile. Puoi offrire al massimo ${maxTheoreticalBid.value}.`)
    state.value.otherPurchases = state.value.otherPurchases.filter((purchase) => purchase.playerId !== playerId)
    state.value.purchases.push({ playerId, price, note: note?.trim() || undefined, slot: slot?.trim() || undefined, purchasedAt: new Date().toISOString() })
  }

  function markAsOther(playerId: string, price?: number, note?: string): void {
    state.value.purchases = state.value.purchases.filter((purchase) => purchase.playerId !== playerId)
    state.value.otherPurchases = state.value.otherPurchases.filter((purchase) => purchase.playerId !== playerId)
    const purchase: OtherPurchase = { playerId, note: note?.trim() || undefined }
    if (price && price > 0) purchase.price = price
    state.value.otherPurchases.push(purchase)
  }

  function setAvailable(playerId: string): void {
    state.value.purchases = state.value.purchases.filter((purchase) => purchase.playerId !== playerId)
    state.value.otherPurchases = state.value.otherPurchases.filter((purchase) => purchase.playerId !== playerId)
  }

  function toggleFavorite(playerId: string): void {
    const ids = state.value.favoritePlayerIds
    state.value.favoritePlayerIds = ids.includes(playerId) ? ids.filter((id) => id !== playerId) : [...ids, playerId]
  }

  function updatePurchase(playerId: string, changes: Partial<Pick<Purchase, 'price' | 'note' | 'slot'>>): void {
    const purchase = state.value.purchases.find((item) => item.playerId === playerId)
    if (!purchase) throw new Error('Acquisto non trovato.')
    if (changes.price !== undefined) {
      const affordable = remainingBudget.value + purchase.price - (remainingSlots.value * leagueConfig.minimumBid)
      if (!Number.isInteger(changes.price) || changes.price < 1 || changes.price > affordable) throw new Error(`Prezzo non sostenibile. Massimo ${affordable}.`)
    }
    Object.assign(purchase, changes)
  }

  function resetAuction(): void { state.value = createInitialState() }
  function exportBackup(): string { return JSON.stringify(createBackup(state.value), null, 2) }
  function importBackup(json: string): void { state.value = parseBackup(json) }

  watch(state, (value) => saveState(value), { deep: true, immediate: true })

  return { state, spent, remainingBudget, remainingSlots, maxTheoreticalBid, spentByRole, purchasesByRole, remainingSlotsByRole, availablePlayers, myPlayers, otherPlayers, purchaseMap, otherMap, playerStatus, buyPlayer, markAsOther, setAvailable, toggleFavorite, updatePurchase, resetAuction, exportBackup, importBackup }
})
