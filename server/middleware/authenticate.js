const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    let {token}=req.headers;
    if(!token){
        res.status(400).json({message:'Token is missing'});
    }
        jwt.verify(token,process.env.JWT_SECRET,function(err){
            if(err){
                res.status(401).json({message:'Unathenticated',err:err})
            }else{
                next();
            }
        });

}