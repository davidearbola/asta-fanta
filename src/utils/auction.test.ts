// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { SEED_VERSION, STORAGE_KEY } from '@/data/config'
import { players } from '@/data/players'
import { useAuctionStore } from '@/stores/auction'
import { canAffordPurchase, maxTheoreticalBid, purchasesCountByRole, remainingBudget } from './auction'
import { createBackup, parseBackup } from './backup'
import { createInitialState, deserializeState, saveState } from './storage'

describe('logica asta', () => {
  beforeEach(() => {
    window.localStorage.clear()
    setActivePinia(createPinia())
  })

  it('calcola budget residuo e massimo rilancio', () => {
    const state = createInitialState()
    state.purchases.push({ playerId: 'p-rom-svilar', price: 30, purchasedAt: '2026-09-11T10:00:00.000Z' })
    expect(remainingBudget(state)).toBe(470)
    expect(maxTheoreticalBid(state)).toBe(447)
  })

  it('protegge i crediti minimi per completare la rosa', () => {
    const state = createInitialState()
    expect(maxTheoreticalBid(state)).toBe(476)
    expect(canAffordPurchase(state, 476)).toBe(true)
    expect(canAffordPurchase(state, 477)).toBe(false)
  })

  it('conta gli slot per ruolo', () => {
    const state = createInitialState()
    state.purchases.push({ playerId: 'p-rom-svilar', price: 30, purchasedAt: 'x' }, { playerId: 'd-rom-wesley', price: 20, purchasedAt: 'x' })
    expect(purchasesCountByRole(state)).toEqual({ P: 1, D: 1, C: 0, A: 0 })
  })

  it('serializza e deserializza lo stato locale', () => {
    const state = createInitialState()
    state.favoritePlayerIds.push(players[0]!.id)
    saveState(state)
    expect(deserializeState(window.localStorage.getItem(STORAGE_KEY)).favoritePlayerIds).toEqual([players[0]!.id])
    expect(deserializeState('{rotto')).toEqual(createInitialState())
  })

  it('rifiuta un backup non valido e accetta quello corretto', () => {
    expect(() => parseBackup('{"hello":true}')).toThrow(/backup valido/)
    const state = createInitialState()
    const restored = parseBackup(JSON.stringify(createBackup(state)))
    expect(restored.seedVersion).toBe(SEED_VERSION)
  })

  it('aggiorna il prezzo di un acquisto', () => {
    const store = useAuctionStore()
    store.buyPlayer('p-rom-svilar', 25)
    store.updatePurchase('p-rom-svilar', { price: 30, note: 'Titolare' })
    expect(store.spent).toBe(30)
    expect(store.purchaseMap.get('p-rom-svilar')?.note).toBe('Titolare')
  })

  it('cambia correttamente stato e consente di annullarlo', () => {
    const store = useAuctionStore()
    store.markAsOther('c-mil-pulisic', 50)
    expect(store.playerStatus('c-mil-pulisic')).toBe('other')
    expect(store.availablePlayers.some((player) => player.id === 'c-mil-pulisic')).toBe(false)
    store.setAvailable('c-mil-pulisic')
    expect(store.playerStatus('c-mil-pulisic')).toBe('available')
  })

  it('usa target e tetto esatti del seed', () => {
    const pulisic = players.find((player) => player.id === 'c-mil-pulisic')
    expect(pulisic).toMatchObject({ target: 42, cap: 55, fvm: 140 })
  })
})
