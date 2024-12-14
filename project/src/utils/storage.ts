import { JournalEntry } from '../types';

export const StorageKeys = {
  JOURNAL_ENTRIES: 'journal-entries',
} as const;

export const loadEntries = (): JournalEntry[] => {
  const saved = localStorage.getItem(StorageKeys.JOURNAL_ENTRIES);
  return saved ? JSON.parse(saved) : [];
};

export const saveEntries = (entries: JournalEntry[]): void => {
  localStorage.setItem(StorageKeys.JOURNAL_ENTRIES, JSON.stringify(entries));
};