import { NextResponse } from 'next/server';

const MEMECOIN_IDS = [
  'dogecoin',
  'shiba-inu',
  'pepe',
  'floki',
  'bonk',
  'babydoge',
  'dogelon-mars',
  'catecoin',
  'monacoin',
  'banano'
];

export async function GET() {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${MEMECOIN_IDS.join(',')}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to fetch memecoins' }, { status: 500 });
  }
}

