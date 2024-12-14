import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JournalEntry } from './types';
import { JournalEntryComponent } from './components/JournalEntry';
import { JournalList } from './components/JournalList';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';
import { loadEntries, saveEntries } from './utils/storage';
import { createNewJournalEntry, updateEntry, deleteEntry as deleteJournalEntry } from './utils/journal';
import AnimatedGradient from './components/AnimatedGradient';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

function App(): JSX.Element {
  const [entries, setEntries] = useState<JournalEntry[]>(loadEntries);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [responseData, setResponseData] = useState<any>(null);

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
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <div className="relative z-10">
            <AnimatedGradient />
            <RemoveScrollBar />
            <div className="relative z-20">
              <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
                      <>
                        <JournalEntryComponent
                          entry={selectedEntry}
                          onSave={saveEntry}
                          onDelete={handleDelete}
                        />
                      </>
                    ) : (
                      <EmptyState />
                    )}
                  </div>
                </div>
              </main>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;