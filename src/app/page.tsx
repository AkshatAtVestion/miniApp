'use client';

import { useState, useEffect } from 'react';
import { Memecoin, Prediction } from '@/types';
import MemecoinPredictionCard from '@/components/MemecoinPredictionCard';

export default function Home() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemecoins = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/memecoins');
        if (!response.ok) {
          throw new Error('Failed to fetch memecoins');
        }
        const data = await response.json();
        setMemecoins(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load memecoins. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemecoins();
  }, []);

  useEffect(() => {
    const storedPredictions = localStorage.getItem('memecoin_predictions');
    if (storedPredictions) {
      setPredictions(JSON.parse(storedPredictions));
    }
  }, []);

  const handlePrediction = (prediction: Prediction) => {
    const newPredictions = [...predictions.filter(p => p.id !== prediction.id), prediction];
    setPredictions(newPredictions);
    localStorage.setItem('memecoin_predictions', JSON.stringify(newPredictions));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Memecoin Prediction Game</h1>
      <p className="text-center mb-8">Predict whether each memecoin &apos s price will go up or down in the next 24 hours!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memecoins.map((memecoin) => (
          <MemecoinPredictionCard
            key={memecoin.id}
            memecoin={memecoin}
            onPrediction={handlePrediction}
          />
        ))}
      </div>
    </main>
  );
}

