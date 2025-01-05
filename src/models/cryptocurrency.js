import mongoose from "mongoose";

const cryptocurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Currency name is required"],
    },
    current_price: {
        type: Number,
        required: [true, "Current price is required"],
    },
    prev_price: { type: Number, default: null },
    price_change_status: { type: Boolean, default: null },
});

const Cryptocurrency = mongoose.models.Cryptocurrency || mongoose.model("Cryptocurrency", cryptocurrencySchema);

export default Cryptocurrency;