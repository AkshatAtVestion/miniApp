import { NextResponse } from 'next/server';

const Crypto_IDs = [
  'bitcoin',
  'ethereum',
  'cardano',
  'solana',
  'dogecoin',
  'chainlink',
  'aptos',
  'sui',
  'sei',
  'uniswap'
];

export async function GET() {
  try {
    const response = await fetch(
      //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1'
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${Crypto_IDs.join(',')}&order=volume_desc&per_page=10&page=1&sparkline=false`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch cryptocurrencies' }, { status: 500 });
  }
}

