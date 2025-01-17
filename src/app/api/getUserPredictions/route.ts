// this route will get the user predictions from the frontend and store it in the database.

import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "../../../dbConfig/dbConfig";
import User from "../../../models/user";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const body = await req.json();

        const { id, username, predictions } = body;

        const user = await User.findOneAndUpdate(
            { id },
            { $set: { username, predictions } },
            { new: true, upsert: true }
        )

        return NextResponse.json({ message: "User predictions updated successfully", user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error getting user predictions:', error.message);
            return NextResponse.json({ error: 'Failed to get the user predictions' }, { status: 500 });
        }

        // Fallback for unexpected error shapes
        console.error('Unexpected error:', error);
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }


}