import React, { useState, useEffect } from 'react';
import { getPersonalizedRecommendations } from '../services/healthService';

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const result = await getPersonalizedRecommendations();
        if (result.length === 1 && result[0].startsWith('Error:')) {
          setError(result[0]);
        } else {
          setRecommendations(result);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('An unexpected error occurred. Please try again later.');
      }
      setLoading(false);
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Personalized Recommendations</h2>
      <ul className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md">
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;