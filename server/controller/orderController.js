import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const createOrder = async (req,res)=>{
    try{
        const user = req.body.user;
        const {products,totalAmount} = req.body;
        
        if(!products || products.length===0){
            return res.status(400).json({
                status:'Fail',
                message:'Order must contain at least one product'
            })
        }
        const newOrder = new Order({
            user:user.id,
            products,
            totalAmount
        })
        await newOrder.save();
        const productId = products.map(item =>item.product)
        const existingOrder =  user.orders
        existingOrder.push({product:productId,order:newOrder.id})
        await User.findByIdAndUpdate(user.id,{orders:existingOrder})

        res.status(201).json({
            status:'Sucess',
            message:"Your order has been placed",
            order:{
                newOrder
            }
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send("server Error")
    }
}

const getUserOrders = async (req,res)=>{
    try{
        const user = req.body.user;
        const orderId = user.orders.map(item => item.order)
        // console.log("orderId");
        const orders = await Promise.all (orderId.map(
            async (id) =>
                await Order.findById(id).populate({
                    path: "products.product",
                    select: "name",
                })
            ));   
        // console.log(orders)
        res.status(200).json({
            status:'Success',
            results:orders.length,
            data:{
                orders
            }
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
}

export default {createOrder,getUserOrders};