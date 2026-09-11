import type { Player, PlayerSort, Role } from '@/types'

const roleOrder: Record<Role, number> = { P: 0, D: 1, C: 2, A: 3 }

export function sortPlayers(list: Player[], sort: PlayerSort): Player[] {
  return [...list].sort((a, b) => {
    if (sort === 'roleRank') return roleOrder[a.role] - roleOrder[b.role] || a.rank - b.rank
    if (sort === 'name') return a.name.localeCompare(b.name, 'it')
    if (sort === 'rank') return a.rank - b.rank
    return b[sort] - a[sort]
  })
}

export function matchesPlan(player: Player, filter: string): boolean {
  if (filter === 'all') return true
  if (filter === 'A') return player.plan === 'A' || player.plan.startsWith('A/')
  if (filter === 'BC') return /(^|\s|\/)B|(^|\s|\/)C/.test(player.plan)
  if (filter === 'bet') return player.isBet
  return player.plan === filter
}
