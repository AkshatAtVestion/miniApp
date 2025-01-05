import User from '../../../models/user';
import { connectDb } from '../../../dbConfig/dbConfig';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    const { id, username } = req.body;

    if (!id || !username) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        await connectDb();

        // Check if the user already exists
        let user = await User.findOne({ id });

        if (!user) {
            user = new User({ id, username, predictions: {} });
            await user.save();
        }

        return res.status(200).json({ message: "User created or already exists", user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
