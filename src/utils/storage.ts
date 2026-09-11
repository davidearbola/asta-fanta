import { SEED_VERSION, STORAGE_KEY } from '@/data/config'
import { players } from '@/data/players'
import type { AuctionState, Purchase } from '@/types'

export function createInitialState(): AuctionState {
  return {
    schemaVersion: 1,
    seedVersion: SEED_VERSION,
    purchases: [],
    otherPurchases: [],
    favoritePlayerIds: [],
    playerNotes: {},
    ui: { liveRole: 'all', onlyAvailable: true },
  }
}

function isPurchase(value: unknown): value is Purchase {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return typeof item.playerId === 'string' && Number.isInteger(item.price) && Number(item.price) > 0 && typeof item.purchasedAt === 'string'
}

export function isAuctionState(value: unknown): value is AuctionState {
  if (!value || typeof value !== 'object') return false
  const state = value as Record<string, unknown>
  return state.schemaVersion === 1 && Array.isArray(state.purchases) && state.purchases.every(isPurchase)
    && Array.isArray(state.otherPurchases) && Array.isArray(state.favoritePlayerIds)
    && !!state.playerNotes && typeof state.playerNotes === 'object'
}

export function sanitizeState(value: AuctionState): AuctionState {
  const ids = new Set(players.map((player) => player.id))
  const initial = createInitialState()
  return {
    ...initial,
    seedVersion: SEED_VERSION,
    purchases: value.purchases.filter((purchase) => ids.has(purchase.playerId)),
    otherPurchases: value.otherPurchases.filter((purchase) => ids.has(purchase.playerId)),
    favoritePlayerIds: value.favoritePlayerIds.filter((id) => ids.has(id)),
    playerNotes: value.playerNotes,
    ui: value.ui && ['all', 'P', 'D', 'C', 'A'].includes(value.ui.liveRole)
      ? { liveRole: value.ui.liveRole, onlyAvailable: value.ui.onlyAvailable !== false }
      : initial.ui,
  }
}

export function deserializeState(raw: string | null): AuctionState {
  if (!raw) return createInitialState()
  try {
    const parsed: unknown = JSON.parse(raw)
    return isAuctionState(parsed) ? sanitizeState(parsed) : createInitialState()
  } catch {
    return createInitialState()
  }
}

export function loadState(): AuctionState {
  if (typeof window === 'undefined') return createInitialState()
  return deserializeState(window.localStorage.getItem(STORAGE_KEY))
}

export function saveState(state: AuctionState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // L'app resta utilizzabile anche se lo storage del browser non è disponibile.
  }
}
