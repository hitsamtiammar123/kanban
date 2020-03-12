const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let {token}=req.headers;
    if(!token){
        res.status(400).json({message:'Token is missing'});
    }
    try{
         req.user=jwt.verify(token,process.env.JWT_SECRET);
         next();
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }

}