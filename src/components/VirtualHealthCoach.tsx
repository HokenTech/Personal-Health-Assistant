import React, { useState, useEffect, useRef } from 'react';
import { getHealthCoachResponse } from '../services/healthService';

const VirtualHealthCoach: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      handleInitialMessage();
    }
  }, []);

  const handleInitialMessage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getHealthCoachResponse("Introduce yourself as a virtual health coach and ask how you can help.");
      if (response.startsWith('Error:')) {
        setError(response);
      } else {
        setMessages([{ text: response, isUser: false }]);
      }
    } catch (error) {
      console.error('Error getting initial health coach response:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await getHealthCoachResponse(input);
      if (response.startsWith('Error:')) {
        setError(response);
      } else {
        const botMessage = { text: response, isUser: false };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error getting health coach response:', error);
      setError('An unexpected error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-16rem)]">
      <h2 className="text-2xl font-semibold mb-4">Virtual Health Coach</h2>
      <div className="bg-gray-100 p-4 rounded-md h-[calc(100%-8rem)] overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.isUser ? 'bg-blue-200 ml-auto' : 'bg-white'
            } max-w-[75%] ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            <p className={`text-sm ${message.isUser ? 'text-blue-800' : 'text-gray-800'}`}>
              {message.isUser ? 'You' : 'Health Coach'}
            </p>
            <p className="mt-1 whitespace-pre-wrap">{message.text}</p>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 flex items-center">
            <div className="animate-pulse mr-2">●</div>
            <div className="animate-pulse mr-2 animation-delay-200">●</div>
            <div className="animate-pulse animation-delay-400">●</div>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ask your health question..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default VirtualHealthCoach;