import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "User ID is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    predictions: {
        type: Map,
        of: String - Boolean,
        default: {},
    },
    score: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.models.gameUser || mongoose.model("gameUser", UserSchema);

export default User;