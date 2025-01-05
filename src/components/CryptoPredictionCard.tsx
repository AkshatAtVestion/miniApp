import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Cryptocurrency, Prediction } from '@/types';
import { initTelegramWebApp } from '@/lib/telegram/client';
interface Props {
  crypto: Cryptocurrency;
  onPrediction: (prediction: Prediction) => void;
}

export default function CryptoPredictionCard({ crypto, onPrediction }: Props) {
  const [prediction, setPrediction] = useState<'up' | 'down' | null>(null);

  const handlePrediction = (value: 'up' | 'down') => {
    setPrediction(value);
    onPrediction({ id: crypto.id, prediction: value });
  };



  return (
    <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 bg-white">
      <Image src={crypto.image} alt={crypto.name} width={50} height={50} />
      <h2 className="text-xl font-bold">{crypto.name}</h2>
      <p className="text-gray-600">{crypto.symbol.toUpperCase()}</p>
      <p className="font-semibold">${crypto.current_price.toFixed(2)}</p>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${prediction === 'up' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
          onClick={() => handlePrediction('up')}
        >
          Up
        </button>
        <button
          className={`px-4 py-2 rounded ${prediction === 'down' ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          onClick={() => handlePrediction('down')}
        >
          Down
        </button>
      </div>
    </div>
  );
}

