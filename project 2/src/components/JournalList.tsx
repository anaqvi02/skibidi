import React from 'react';
import { ChevronRight } from 'lucide-react';
import { JournalEntry } from '../types';
import { slideIn } from '../utils/animations';

interface Props {
  entries: JournalEntry[];
  onSelect: (entry: JournalEntry) => void;
  selectedId?: string;
}

export function JournalList({ entries, onSelect, selectedId }: Props) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg ${slideIn}`}>
      <h2 className="text-lg font-semibold mb-4 text-primary">Journal Entries</h2>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={`w-full text-left p-3 rounded-md flex items-center justify-between transform transition-all duration-300 hover:scale-102 ${slideIn} ${
              selectedId === entry.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-white hover:bg-primary-light/10'
            }`}
          >
            <div>
              <p className="font-medium">{entry.title || 'Untitled Entry'}</p>
              <p className="text-sm opacity-75">{entry.date}</p>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
              selectedId === entry.id ? 'rotate-90' : ''
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}