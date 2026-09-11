export type Role = 'P' | 'D' | 'C' | 'A'
export type HealthStatus = 'OK' | 'VERDE' | 'GIALLO' | 'ROSSO'
export type AuctionPlayerStatus = 'available' | 'mine' | 'other'
export type UpdatePriority = 'ALTA' | 'MEDIA' | 'NUOVO'

export interface PlayerUpdate {
  priority: UpdatePriority
  change: string
  auctionAdvice: string
  source: string
}

export interface Player {
  id: string
  rank: number
  role: Role
  name: string
  team: string
  qa: number
  fvm: number
  slot: string
  plan: string
  target: number
  cap: number
  starter: string | null
  setPieces: string | null
  modifierFit: string | null
  health: HealthStatus
  returnStatus: string | null
  advice: string | null
  quoteSource: string | null
  healthSource: string | null
  isBet: boolean
  betReason?: string
  betRule?: string
  lastUpdate?: PlayerUpdate
}

export interface UpdateItem extends PlayerUpdate {
  player: string
  role: Role
  target: number
  cap: number
}

export interface Purchase {
  playerId: string
  price: number
  slot?: string
  note?: string
  purchasedAt: string
}

export interface OtherPurchase {
  playerId: string
  price?: number
  note?: string
}

export interface UiPreferences {
  liveRole: Role | 'all'
  onlyAvailable: boolean
}

export interface AuctionState {
  schemaVersion: 1
  seedVersion: string
  purchases: Purchase[]
  otherPurchases: OtherPurchase[]
  favoritePlayerIds: string[]
  playerNotes: Record<string, string>
  ui: UiPreferences
}

export interface BackupFile {
  app: 'fantacalcio-auction-assistant'
  exportedAt: string
  schemaVersion: number
  seedVersion: string
  state: AuctionState
}

export type PlayerSort = 'roleRank' | 'rank' | 'fvm' | 'target' | 'cap' | 'qa' | 'name'
