import { NextResponse } from "next/server";
import { connectDb } from "../../../dbConfig/dbConfig";
import Cryptocurrency from "../../../models/cryptocurrency";
// these comments are not applicable for this route now. 
// this api route is called every 24 hours to set the price of cryptocurrencies in the database 
// one more api route will run 24 hour clock to check the predictions and update the scores
// after the end of the 24 hours this is called again to update the database but to also compare with the existing db to see if the price has gone up or down

export async function POST() {
    try {
        const response = await fetch('http://localhost:3000/api/cryptocurrencies');
        const cryptos = await response.json();
        //console.log('Cryptos:', cryptos);


        if (!cryptos || !Array.isArray(cryptos)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
        }

        const cryptoDataToStore = cryptos.map((crypto: { name: string, current_price: number }) => ({
            name: crypto.name,
            current_price: crypto.current_price
        }));

        await connectDb();

        await Cryptocurrency.deleteMany({});    // clear the collection before storing new data

        const savedCryptos = await Cryptocurrency.insertMany(cryptoDataToStore, { ordered: false });

        return NextResponse.json({ message: 'Cryptos stored successfully', data: savedCryptos });
    } catch (error: any) {
        console.error('Error storing cryptos:', error.message);

        if (error.code === 11000) {
            return NextResponse.json({ warning: 'Some cryptos were already stored' }, { status: 200 });
        }

        return NextResponse.json({ error: 'Failed to store cryptocurrencies' }, { status: 500 });
    }

}