import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const createOrder = async (req, res) => {
    try {
        const user = req.body.user;
        const { products, totalAmount } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({
                status: "Fail",
                message: "Order must contain at least one product",
            });
        }
        const newOrder = new Order({
            user: user.id,
            products,
            totalAmount,
        });
        await newOrder.save();
        const productId = products.map((item) => item.product);
        const existingOrder = user.orders;
        existingOrder.push({ product: productId, order: newOrder.id });
        await User.findByIdAndUpdate(user.id, { orders: existingOrder });

        res.status(201).json({
            status: "Sucess",
            message: "Your order has been placed",
            order: {
                newOrder,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("server Error");
    }
};

const getUserOrders = async (req, res) => {
    try {
        const user = req.body.user;
        const orderId = user.orders.map((item) => item.order);
        // console.log("orderId");
        const orders = await Promise.all(
            orderId.map(
                async (id) =>
                    await Order.findById(id).populate({
                        path: "products.product",
                        select: "name",
                    })
            )
        );
        // console.log(orders)
        res.status(200).json({
            status: "Success",
            results: orders.length,
            data: {
                orders,
            },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

const cancelOrder = async (req, res) => {
    const orderId = req.body;

    try {
        const user = req.body.user;

        const orderIndex = user.orders.findIndex(
            (order) => order.order.toString() === orderId
        );
        if (orderIndex === -1) {
            return res.status(404).json({
                status: "Fail",
                message: "Order not found in user's orders",
            });
        }

        user.orders.splice(orderIndex, 1);
        await user.save();
        await Order.findByIdAndDelete(orderId);

        res.status(200).json({
            status: "Success",
            message: "Order canceled successfully",
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};

const getOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                status: "Fail",
                message: "Order not found",
            });
        }
        if (req.body.user.id !== order.user.toString()) {
            return res.status(401).json({
                status: "Fail",
                message: "You are not authorized to view this order",
            });
        }

        const products = await Promise.all(
            order.products.map(async (item) => {
                const product = await Product.findById(item.product);
                return {
                    product: product.name,
                    quantity: item.quantity,
                    image: product.images[0],
                    price: item.price,
                };
            })
        );

        res.json({
            status: "Success",
            data: {
                products,
                totalAmount: order.totalAmount,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export default { createOrder, getUserOrders, cancelOrder, getOrder };
