import React from 'react';
import { PlusCircle, Book } from 'lucide-react';

interface Props {
  onNewEntry: () => void;
}

export function Header({ onNewEntry }: Props) {
  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Book className="w-8 h-8 text-black mr-2" />
            <Link to="/blog">
              <h1 className="text-2xl font-bold text-black cursor-pointer">Echo Journal</h1>
            </Link>
          </div>
          <button
            onClick={onNewEntry}
            className="flex items-center px-4 py-2 bg-lightblue text-black rounded-md hover:bg-lighterblue transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Entry
          </button>
        </div>
      </div>
    </header>
  );
}