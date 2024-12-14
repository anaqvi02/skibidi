import React, { useState, useRef, useEffect } from 'react';
import skib from "./JournalEntry";

console.log(skib);

interface TextboxProps {
  responseData: any;
}

export const Textbox: React.FC<TextboxProps> = ({ responseData }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (responseData) {
      setText(JSON.stringify(responseData, null, 2));
      console.log("Response Data Received in TextBox:", responseData); // Log the responseData
    }
  }, [responseData]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="flex flex-col p-4 bg-lightblue rounded-lg shadow-md overflow-hidden">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-blue rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden resize-none bg-lighterblue"
        rows={1}
        readOnly
      />
    </div>
  );
};

export default Textbox;