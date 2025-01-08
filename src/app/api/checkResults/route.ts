import { NextResponse } from "next/server";
import { connectDb } from "../../../dbConfig/dbConfig";
import Cryptocurrency from "../../../models/cryptocurrency";
// this gets the data of cryptocurrencies after every 24 hours to check the price change and updates the database accoddingly
export async function POST() {
    try {
        const response = await fetch('http://localhost:3000/api/cryptocurrencies');
        const cryptos = await response.json();

        if (!cryptos || !Array.isArray(cryptos)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
        }

        await connectDb();

        for (const crypto of cryptos) {
            const { name, current_price } = crypto;

            const existingCrypto = await Cryptocurrency.findOne({ name });

            if (existingCrypto) {
                const priceChangeStatus = current_price > existingCrypto.current_price; // true if price has gone up, false if price has gone down

                existingCrypto.prev_price = existingCrypto.current_price;
                existingCrypto.current_price = current_price;
                existingCrypto.price_change_status = priceChangeStatus;

                await existingCrypto.save();
            } else {
                await Cryptocurrency.create({
                    name,
                    current_price,
                    prev_price: null,
                    price_change_status: null,
                });
            }
        }

        return NextResponse.json({ message: 'Cryptos stored successfully' });
    } catch (error: any) {
        console.error('Error updating cryptos:', error.message);
        return NextResponse.json({ error: 'Failed to update cryptocurrencies' }, { status: 500 });
    }
}