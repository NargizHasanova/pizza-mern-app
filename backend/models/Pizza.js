import mongoose from "mongoose";
const { Schema } = mongoose

const PizzaSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        priceB: {
            type: Number,
            required: true,
        },
        priceM: {
            type: Number,
            required: true,
        },
        priceS: {
            type: Number,
            required: true,
        },
        crust: {
            type: [String], 
            required: true,
        },
        size: {
            type: [Number], 
            required: true,
        },
        img: {
            type: String,
        },
        count: {
            type: Number,
            required: true,
        },
    }
);

export default mongoose.model("Pizza", PizzaSchema)