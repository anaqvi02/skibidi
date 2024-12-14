import { JournalEntry } from '../types';

export const createNewJournalEntry = (): JournalEntry => ({
  id: Date.now().toString(),
  title: '',
  content: '',
  date: new Date().toLocaleDateString(),
});

export const updateEntry = (
  entries: JournalEntry[],
  updatedEntry: JournalEntry
): JournalEntry[] => 
  entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e));

export const deleteEntry = (
  entries: JournalEntry[],
  id: string
): JournalEntry[] => 
  entries.filter((e) => e.id !== id);