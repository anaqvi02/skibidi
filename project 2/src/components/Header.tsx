import React from 'react';
import { PlusCircle, Book } from 'lucide-react';
import { fadeIn, bounce } from '../utils/animations';

interface Props {
  onNewEntry: () => void;
}

export function Header({ onNewEntry }: Props) {
  return (
    <header className={`bg-primary shadow-lg ${fadeIn}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center group">
            <Book className={`w-8 h-8 text-white mr-2 group-hover:${bounce}`} />
            <h1 className="text-2xl font-bold text-white">My Journal</h1>
          </div>
          <button
            onClick={onNewEntry}
            className="flex items-center px-4 py-2 bg-primary-light text-white rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Entry
          </button>
        </div>
      </div>
    </header>
  );
}