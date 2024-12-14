import React from 'react';
import { ChevronRight } from 'lucide-react';
import { JournalEntry } from '../types';

interface Props {
  entries: JournalEntry[];
  onSelect: (entry: JournalEntry) => void;
  selectedId?: string;
}

export function JournalList({ entries, onSelect, selectedId }: Props) {
  return (
    <div className="bg-lightblue p-4 rounded-lg h-100 overflow-y-auto">
      <h2 className=" text-2xl font-semibold mb-1 text-center text-blue sticky -top-5 bg-lightblue z-10 p-2">Journal Entries</h2>
      <div className="space-y-2">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className={`w-full text-left bg-lighterblue p-3 rounded-md flex items-center justify-between ${
              selectedId === entry.id
                ? 'bg-lighterblue text-white'
                : 'bg-blue hover:bg-lightestblue'
            }`}
          >
            <div>
              <p className="font-medium">{entry.title || 'Untitled Entry'}</p>
              <p className="text-sm opacity-75">{entry.date}</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}