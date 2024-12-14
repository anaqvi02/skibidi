import React from 'react';
import { Book } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="bg-lighterblue rounded-lg shadow-md p-8 text-center">
      <Book className="w-12 h-12 text-9075d8-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-blue mb-2">
        No Entry Selected
      </h3>
      <p className="text-lightblue">
        Select an entry from the list or create a new one to start writing.
      </p>
    </div>
  );
}