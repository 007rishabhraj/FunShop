import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const verifyUser = async (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
     
    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(401).json({
            message:'You are not logged in'
        })
    }
    req.body.user = user;
    next();
}

export default verifyUser