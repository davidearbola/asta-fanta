import { leagueConfig, roles } from '@/data/config'
import { players } from '@/data/players'
import type { AuctionState, Player, Role } from '@/types'

export const totalRosterSlots = Object.values(leagueConfig.roster).reduce((sum, value) => sum + value, 0)

export function spent(state: AuctionState): number {
  return state.purchases.reduce((sum, purchase) => sum + purchase.price, 0)
}

export function remainingBudget(state: AuctionState): number {
  return leagueConfig.budget - spent(state)
}

export function remainingSlots(state: AuctionState): number {
  return Math.max(0, totalRosterSlots - state.purchases.length)
}

export function maxTheoreticalBid(state: AuctionState): number {
  const slots = remainingSlots(state)
  return slots > 0 ? Math.max(0, remainingBudget(state) - (slots - 1) * leagueConfig.minimumBid) : 0
}

export function canAffordPurchase(state: AuctionState, price: number): boolean {
  return Number.isInteger(price) && price >= leagueConfig.minimumBid && price <= maxTheoreticalBid(state)
}

export function spentByRole(state: AuctionState): Record<Role, number> {
  const result: Record<Role, number> = { P: 0, D: 0, C: 0, A: 0 }
  for (const purchase of state.purchases) {
    const player = players.find((candidate) => candidate.id === purchase.playerId)
    if (player) result[player.role] += purchase.price
  }
  return result
}

export function purchasesCountByRole(state: AuctionState): Record<Role, number> {
  const result: Record<Role, number> = { P: 0, D: 0, C: 0, A: 0 }
  for (const purchase of state.purchases) {
    const player = players.find((candidate) => candidate.id === purchase.playerId)
    if (player) result[player.role] += 1
  }
  return result
}

export function remainingSlotsByRole(state: AuctionState): Record<Role, number> {
  const counts = purchasesCountByRole(state)
  return Object.fromEntries(roles.map((role) => [role, Math.max(0, leagueConfig.roster[role] - counts[role])])) as Record<Role, number>
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it').trim()
}

export function matchesSearch(player: Player, query: string): boolean {
  const needle = normalizeSearch(query)
  if (!needle) return true
  return normalizeSearch(`${player.name} ${player.team} ${player.role}`).includes(needle)
}

export function priceSignal(player: Player, price: number): { tone: 'good' | 'warn' | 'stop'; message: string } {
  if (price <= player.target) return { tone: 'good', message: 'Ottimo prezzo rispetto al piano.' }
  if (price <= player.cap) return { tone: 'warn', message: 'Sei sopra il target, ma ancora entro il tetto.' }
  return { tone: 'stop', message: 'STOP: stai superando il tetto consigliato.' }
}
