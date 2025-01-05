// import mongoose, { connect } from "mongoose";

// export async function connectDb() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI!);
//         const connection = await mongoose.connection;

//         connection.on('connection', () => {
//             console.log("mongo dbconnected");
//         })
//         connection.on('error', (err: any) => {
//             console.log("mongodb connection error:", err);
//             process.exit();
//         })


//     } catch (err: any) {
//         console.log(err.message);
//     }
// }