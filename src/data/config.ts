import type { Role } from '@/types'

export const SEED_VERSION = '2026-09-11'
export const STORAGE_KEY = 'fanta-auction:v1:state'
export const roles: Role[] = ['P', 'D', 'C', 'A']

export const leagueConfig = {
  participants: 8,
  budget: 500,
  mode: 'Classic',
  defenseModifier: true,
  roster: { P: 3, D: 8, C: 8, A: 6 } satisfies Record<Role, number>,
  budgetTargets: { P: 35, D: 80, C: 100, A: 285 } satisfies Record<Role, number>,
  budgetRanges: { P: [30, 40], D: [75, 90], C: [95, 110], A: [275, 300] } satisfies Record<Role, [number, number]>,
  minimumBid: 1,
} as const

export const roleNames: Record<Role, string> = {
  P: 'Portieri', D: 'Difensori', C: 'Centrocampisti', A: 'Attaccanti',
}
