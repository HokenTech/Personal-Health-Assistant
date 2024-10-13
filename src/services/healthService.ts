import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY || '');

const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  if (error.message?.includes('API key')) {
    return 'Error: Invalid or missing API key. Please check your configuration.';
  }
  if (error.message?.includes('network')) {
    return 'Error: Network issue. Please check your internet connection and try again.';
  }
  return 'An unexpected error occurred. Please try again later.';
};

const removeFormatting = (text: string): string => {
  return text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#+\s/g, '').trim();
};

export const analyzeSymptoms = async (symptoms: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const prompt = `As a medical AI assistant, analyze the following symptoms and provide possible health insights. Do not diagnose, but offer general information and suggest when to seek professional medical advice. Provide the response in plain text format without any markdown or special formatting. Symptoms: ${symptoms}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return removeFormatting(response.text());
  } catch (error) {
    return handleApiError(error);
  }
};

export const getPersonalizedRecommendations = async (): Promise<string[]> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const prompt = "Provide 5 concise general health and wellness recommendations that can benefit most people. Include tips on diet, exercise, sleep, and stress management. Provide each recommendation in plain text format without any markdown or special formatting.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().split('\n').map(removeFormatting).filter(item => item.trim() !== '');
  } catch (error) {
    return [handleApiError(error)];
  }
};

export const getHealthCoachResponse = async (query: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const prompt = `As a virtual health coach, provide a brief and helpful response to the following health-related query. Offer concise advice and information, emphasizing the importance of consulting with a healthcare professional for personalized medical advice. Provide the response in plain text format without any markdown or special formatting. Query: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return removeFormatting(response.text());
  } catch (error) {
    return handleApiError(error);
  }
};