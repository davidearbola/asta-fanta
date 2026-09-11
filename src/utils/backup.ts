import { SEED_VERSION } from '@/data/config'
import type { AuctionState, BackupFile } from '@/types'
import { isAuctionState, sanitizeState } from './storage'

export function createBackup(state: AuctionState): BackupFile {
  return {
    app: 'fantacalcio-auction-assistant',
    exportedAt: new Date().toISOString(),
    schemaVersion: 1,
    seedVersion: SEED_VERSION,
    state,
  }
}

export function parseBackup(json: string): AuctionState {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error('Il file non contiene JSON valido.')
  }
  if (!parsed || typeof parsed !== 'object') throw new Error('Struttura backup non valida.')
  const backup = parsed as Partial<BackupFile>
  if (backup.app !== 'fantacalcio-auction-assistant' || !isAuctionState(backup.state)) {
    throw new Error('Questo file non è un backup valido di Fanta Asta.')
  }
  return sanitizeState(backup.state)
}

export function backupFileName(now = new Date()): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `fantacalcio-asta-backup-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}.json`
}
