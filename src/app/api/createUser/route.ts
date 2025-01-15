import User from '@/models/user';
import { connectDb } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse the request body
        const { id, username } = body;

        if (!id || !username) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await connectDb();
        // Check if the user already exists
        let user = await User.findOne({ id });
        console.log("User", user);
        if (!user) {
            user = new User({ id, username, predictions: {} });
            await user.save();
        }
        console.log("User created or already exists", user);
        return NextResponse.json({ message: "User created or already exists", user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
