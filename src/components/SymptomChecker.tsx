import React, { useState } from 'react';
import { analyzeSymptoms } from '../services/healthService';

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await analyzeSymptoms(symptoms);
      if (result.startsWith('Error:')) {
        setError(result);
        setAnalysis('');
      } else {
        setAnalysis(result);
      }
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setError('An unexpected error occurred. Please try again.');
      setAnalysis('');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Symptom Checker</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms..."
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading || !symptoms.trim()}
        >
          {loading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>
      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
          <p>{error}</p>
        </div>
      )}
      {analysis && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h3 className="text-xl font-semibold mb-2">Analysis:</h3>
          <p className="whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;