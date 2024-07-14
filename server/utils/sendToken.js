import jwt from 'jsonwebtoken'

const sendToken = (user,statuscode,token,res)=>{
    // const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
    //     expiresIn:process.env.JWT_EXPIRES_IN
    // });
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+30*24*60*60*1000),
        // domain:'',
        // secure: true,
        // sameSite:'none'
    });
    console.log(res.cookie);
    user.password = undefined;
    res.status(statuscode).json({
        status:'success',
        token,
        user
    });
}

export default sendToken;