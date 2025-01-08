import mongoose from "mongoose";

export async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connection', () => {
            console.log("mongo dbconnected");
        })
        connection.on('error', (err: Error) => {
            console.error("MongoDB connection error:", err.message);
            process.exit(1);
        });



    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error connecting to database:', error.message);
        } else {
            console.error('An unknown error occurred in dbConnection:', error);
        }
    }

}