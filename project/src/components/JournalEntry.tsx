import React, { useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { JournalEntry } from '../types';

var skib = 0;

interface Props {
  entry: JournalEntry;
  onSave: (entry: JournalEntry) => void; // Modified to not include response
  onDelete: (id: string) => void;
}

export function JournalEntryComponent({ entry, onSave, onDelete }: Props) {
  const [title, setTitle] = React.useState(entry.title);
  const [content, setContent] = React.useState(entry.content);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [responseData, setResponseData] = React.useState<any>(null); // State for response data


  useEffect(() => {
    setTitle(entry.title);
    setContent(entry.content);
  }, [entry]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await fetch('/your-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...entry, title, content }),
      });
      console.log("this is running");
      const responseData = await response.json();
      console.log("this is running 2");

      console.log(typeof(responseData))
      console.log("this is running 3");
      console.log(JSON.stringify(responseData))
      setResponseData(responseData);
      skib = responseData


      
      await onSave({ ...entry, title, content }); // Changed to no longer accept response
      console.log(responseData)

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-lightblue rounded-lg shadow-md p-6 mb-4">
      {error && (
        <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
          {error}
        </div>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-xl font-semibold bg-lighterblue rounded-md mb-4 p-2 border-b border-blue focus:outline-none focus:border-blue-500 "
        placeholder="Entry Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-48 p-2 bg-lighterblue border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="How was your day?"
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={handleSave}
          className={`flex items-center px-4 py-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue hover:bg-lighterblue'} text-white rounded-md transition-colors`}
          disabled={isSaving}
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="flex bg-blue items-center px-4 py-2 bg-9f63c4 text-white rounded-md hover:bg-lightblue transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>

      </div>
  );
}

export default skib
