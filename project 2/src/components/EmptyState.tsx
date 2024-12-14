import React from 'react';
import { Book } from 'lucide-react';
import { scaleIn, bounce } from '../utils/animations';

export function EmptyState() {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center ${scaleIn}`}>
      <Book className={`w-12 h-12 text-primary mx-auto mb-4 ${bounce}`} />
      <h3 className="text-lg font-medium text-primary mb-2">
        No Entry Selected
      </h3>
      <p className="text-secondary">
        Select an entry from the list or create a new one to start writing.
      </p>
    </div>
  );
}