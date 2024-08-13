import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const verifyUser = async (req,res,next)=>{
    // console.log(req.cookies);
    console.log("body kha gya");
    console.log(req.body);
    let token = req.cookies.token;
    console.log("token",token);
    
    if(!token){
        return res.status(400).json({
            status:"Error",
            message:"Token not provided from verifyuser"
        })
    }
    // token = token.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(401).json({
            message:'You are not logged in'
        })
    }
    // user.password= null;
    req.body.user = user;
    next();
}

export default verifyUser