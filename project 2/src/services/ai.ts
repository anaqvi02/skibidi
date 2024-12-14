import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = 'AIzaSyDq2Rl6CQ-OQu12PQB0_RPKt_lyzY0Wz1s';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const systemPrompt = `Analyze the following journal entry and provide concise, dot-point feedback focusing on:
- Key emotions: Identify the dominant emotions expressed.
- Recurring themes: Highlight any recurring thoughts, patterns, or concerns.
- Actionable insights: Suggest one or two brief, actionable steps.
Keep each point to a maximum of 10 words.`;

export async function getAIFeedback(content: string): Promise<string> {
  try {
    const prompt = `${systemPrompt}\n\nJournal Entry: ${content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Feedback Error:', error);
    return 'Unable to generate AI feedback at this time.';
  }
}