import React, { useEffect } from 'react';
import { JournalEntry } from './types';
import { JournalEntryComponent } from './components/JournalEntry';
import { JournalList } from './components/JournalList';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { AnimatedBackground } from './components/AnimatedBackground';
import { loadEntries, saveEntries } from './utils/storage';
import { createNewJournalEntry, updateEntry, deleteEntry as deleteJournalEntry } from './utils/journal';

function App() {
  const [entries, setEntries] = React.useState<JournalEntry[]>(loadEntries);
  const [selectedEntry, setSelectedEntry] = React.useState<JournalEntry | null>(null);

  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const createNewEntry = () => {
    const newEntry = createNewJournalEntry();
    setEntries([newEntry, ...entries]);
    setSelectedEntry(newEntry);
  };

  const saveEntry = (updatedEntry: JournalEntry) => {
    setEntries(updateEntry(entries, updatedEntry));
    setSelectedEntry(updatedEntry);
  };

  const handleDelete = (id: string) => {
    setEntries(deleteJournalEntry(entries, id));
    setSelectedEntry(null);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Header onNewEntry={createNewEntry} />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <JournalList
              entries={entries}
              onSelect={setSelectedEntry}
              selectedId={selectedEntry?.id}
            />
          </div>
          <div className="md:col-span-2">
            {selectedEntry ? (
              <JournalEntryComponent
                entry={selectedEntry}
                onSave={saveEntry}
                onDelete={handleDelete}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;