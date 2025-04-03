const {JWT_SECRET}=require("./config")
const jwt=require("jsonwebtoken")

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer') ){
        return res.statu(403).json({
            msg:"Attach token please"
        })
    }

    const token=authHeader.split(' ')[1];

    try{
       const decode= jwt.verify(token,JWT_SECRET) 

       if(decode.userId){ 
        req.userId=decode.userId;//If the JWT token is valid and contains a userId field, then req.userId will store that value.
        //This allows any route protected by authMiddleware to access req.userId, which typically represents the authenticated user’s ID.

        next();
       }
       
    }catch(err){
        return res.status(400).json({
            msg:"Invalid credentials"
        })
    }
};

module.exports={
    authMiddleware
}