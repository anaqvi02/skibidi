import React, { useEffect } from 'react';
import { Save, Trash2, Sparkles } from 'lucide-react';
import { JournalEntry } from '../types';
import { scaleIn } from '../utils/animations';
import { useAIFeedback } from '../hooks/useAIFeedback';

interface Props {
  entry: JournalEntry;
  onSave: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

export function JournalEntryComponent({ entry, onSave, onDelete }: Props) {
  const [title, setTitle] = React.useState(entry.title);
  const [content, setContent] = React.useState(entry.content);
  const { generateFeedback, isLoading, error } = useAIFeedback();

  useEffect(() => {
    setTitle(entry.title);
    setContent(entry.content);
  }, [entry]);

  const handleSave = async () => {
    const updatedEntry = {
      ...entry,
      title,
      content,
    };
    onSave(updatedEntry);
  };

  const handleGenerateFeedback = async () => {
    const feedback = await generateFeedback(content);
    if (feedback) {
      onSave({
        ...entry,
        title,
        content,
        aiFeedback: feedback,
      });
    }
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-4 ${scaleIn}`}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-semibold mb-4 p-2 border-b border-secondary/30 bg-transparent focus:outline-none focus:border-primary transition-colors"
        placeholder="Entry Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-48 p-2 border rounded-md border-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary bg-white/50 transition-all duration-300"
        placeholder="Write your thoughts..."
      />
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button
            onClick={handleGenerateFeedback}
            disabled={isLoading || !content}
            className="flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
          </button>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="flex items-center px-4 py-2 bg-red-500/80 text-white rounded-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {entry.aiFeedback && (
        <div className={`mt-4 p-4 bg-secondary-light/20 rounded-md ${scaleIn}`}>
          <h4 className="font-semibold text-primary mb-2">AI Feedback</h4>
          <div className="text-secondary-dark whitespace-pre-line">
            {entry.aiFeedback}
          </div>
        </div>
      )}
    </div>
  );
}