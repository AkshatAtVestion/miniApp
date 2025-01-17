'use client';

import { useState, useEffect } from 'react';
import { Prediction, Cryptocurrency } from '@/types';
import CryptoPredictionCard from '@/components/CryptoPredictionCard';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const [Cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/cryptocurrencies');
        if (!response.ok) {
          throw new Error('Failed to fetch memecoins');
        }
        const data = await response.json();
        setCryptocurrencies(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load memecoins. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptocurrencies();
  }, []);

  // useEffect(() => {
  //   connectDb()
  // }, []);

  useEffect(() => {
    const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || ""; // unsafe
    if (initDataUnsafe && initDataUnsafe.user) {
      const { id, username } = initDataUnsafe.user;

      const payLoad = {
        id,
        username,
      };
      console.log("Payload", payLoad);
      fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.log("No user data found");
    }
  }, [])

  useEffect(() => {
    const storedPredictions = localStorage.getItem('memecoin_predictions');
    if (storedPredictions) {
      setPredictions(JSON.parse(storedPredictions));
    }
  }, []);

  const handleSubmit = async () => {
    console.log("submitting predictions...");

    try {
      const initDataUnsafe = window.Telegram?.WebApp?.initDataUnsafe || ""; // User data from Telegram WebApp
      if (!initDataUnsafe || !initDataUnsafe.user) {
        console.error("User data not found");
        return;
      }

      const { id, username } = initDataUnsafe.user;

      const payLoad = {
        id,
        username,
        predictions: predictions.reduce<Record<string, boolean | null>>((acc, curr) => {
          acc[curr.id] = curr.prediction;
          return acc;
        }, {}),
      };


      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad),
      })

      if (!response.ok) {
        throw new Error('Failed to submit predictions');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error submitting predictions:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }

  }

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
      <h1 className="text-3xl font-bold mb-8 text-center">Cryptocurrency Prediction Game</h1>
      <p className="text-center mb-8">Predict whether each cryptocurrency &apos s price will go up or down in the next 24 hours!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Cryptocurrencies.map((Cryptocurrency) => (
          <CryptoPredictionCard
            key={Cryptocurrency.id}
            crypto={Cryptocurrency}
            onPrediction={handlePrediction}
          />
        ))}
      </div>
      <button className={'px-4 py-2 rounded bg-white'} onClick={handleSubmit}>Submit</button>
    </main>
  );
}

