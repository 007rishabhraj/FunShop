import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const verifyUser = async (req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(400).json({
            status:"Error",
            message:"Token not provided"
        })
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(401).json({
            message:'You are not logged in'
        })
    }
    user.password= null;
    req.body.user = user;
    next();
}

export default verifyUser