const jwt=require('jsonwebtoken');

module.exports={
    
    makeToken:(attr)=>{
        return jwt.sign(attr, process.env.JWT_SECRET);
    }
}