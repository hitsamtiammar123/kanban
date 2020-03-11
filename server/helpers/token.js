const jwt=require('jsonwebtoken');

module.exports={
    makeToken:(attr)=>{
        return jwt.sign(attr, process.env.JWT_SECRET);
    },
    decodeToken:(headers)=>{
        try{
            return jwt.decode(headers.token,process.env.JWT_SECRET);
        }catch(err){    
            return null;
        }
    }
}