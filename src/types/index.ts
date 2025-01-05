export interface Prediction {
  id: string;
  prediction: 'up' | 'down';
}

export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
}