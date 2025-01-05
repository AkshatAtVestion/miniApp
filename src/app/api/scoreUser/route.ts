import { NextResponse } from "next/server";
import { connectDb } from "../../../dbConfig/dbConfig";
import User from "../../../models/user";
import Cryptocurrency from "../../../models/cryptocurrency";

// gets the users predictions from the user database 
// gets the price change status from the cryptocurrency db
// compares the predictions with the actual scores and gives them the result 

export async function POST() {
    try {
        await connectDb();
        console.log("Connected to the database");
        const cryptos = await Cryptocurrency.find({});
        if (!cryptos || cryptos.length === 0) {
            return NextResponse.json({ error: "No cryptocurrencies found" }, { status: 404 });
        }
        console.log("Cryptos found:", cryptos);
        const cryptoPriceChanges: Record<string, boolean> = {};
        cryptos.forEach((crypto) => {
            cryptoPriceChanges[crypto.name] = crypto.price_change_status; // true if price has gone up, false if price has gone down
        });
        console.log("Crypto price changes:", cryptoPriceChanges);

        const users = await User.find({});
        if (!users || users.length === 0) {
            return NextResponse.json({ error: "No users found" }, { status: 404 });
        }
        console.log("Users found:", users);

        for (const user of users) {
            let score = 0;

            user.predictions.forEach((predictedChange: boolean, cryptoName: string) => {
                if (cryptoPriceChanges[cryptoName] === predictedChange) {
                    score += 1;
                }
            });

            user.score = Math.min(score, 10);
            await user.save();

        }
        return NextResponse.json({
            message: "User scores updated successfully",
            totalUsers: users.length,
        });
    } catch (error: any) {
        console.error("Error comparing predictions and updating scores:", error.message);
        return NextResponse.json({ error: "Failed to update user scores" }, { status: 500 });
    }
}

