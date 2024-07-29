import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required:true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: Number,
            price: Number,
        },
    ],
    totalAmount: Number,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
