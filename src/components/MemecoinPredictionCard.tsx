import Image from 'next/image';
import { useState } from 'react';
import { Memecoin, Prediction } from '@/types';

interface Props {
  memecoin: Memecoin;
  onPrediction: (prediction: Prediction) => void;
}

export default function MemecoinPredictionCard({ memecoin, onPrediction }: Props) {
  const [prediction, setPrediction] = useState<'up' | 'down' | null>(null);

  const handlePrediction = (value: 'up' | 'down') => {
    setPrediction(value);
    onPrediction({ id: memecoin.id, prediction: value });
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 bg-white shadow-md">
      <Image src={memecoin.image} alt={memecoin.name} width={50} height={50} />
      <h2 className="text-xl font-bold">{memecoin.name}</h2>
      <p className="text-gray-600">{memecoin.symbol.toUpperCase()}</p>
      <p className="font-semibold">${memecoin.current_price.toFixed(6)}</p>
      <div className="flex space-x-2">
        <button
          className={`px-4 py-2 rounded transition-colors ${
            prediction === 'up' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-green-200'
          }`}
          onClick={() => handlePrediction('up')}
        >
          Up
        </button>
        <button
          className={`px-4 py-2 rounded transition-colors ${
            prediction === 'down' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-red-200'
          }`}
          onClick={() => handlePrediction('down')}
        >
          Down
        </button>
      </div>
    </div>
  );
}

