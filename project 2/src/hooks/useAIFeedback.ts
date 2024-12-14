import { useState } from 'react';
import { getAIFeedback } from '../services/ai';

export function useAIFeedback() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateFeedback = async (content: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const feedback = await getAIFeedback(content);
      return feedback;
    } catch (err) {
      setError('Failed to generate AI feedback');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateFeedback, isLoading, error };
}