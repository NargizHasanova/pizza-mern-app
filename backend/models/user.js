import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id: { type: String },
    // orderList: [
    //     {
    //         name: String,
    //         crust: String,
    //         size: String,
    //         count: Number,
    //         price: Number,
    //         salesNum: Number,
    //     }
    // ],
    orderList: {
        type: Array,
        default: []
    },
});

export default mongoose.model("User", userSchema);