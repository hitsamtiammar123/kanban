const {User}=require('../models');
const {makeToken}=require('../middleware/token');

class AuthController{
    static async login(req,res){
        let {email,password}=req.body;

        try{
            let user=await User.loginUser(email,password);
            if(!user){
                res.status(400).json({message:'Email or Password is wrong'});
            }
            else{
                let token=makeToken({id:user.id,email:user.email,name:user.name});
                return res.status(200).json({token:token});
            }

        }catch(err){
            res.status(500).json(err);
        }

    }

    static async register(req,res){
        let {email,name,password}=req.body;

        try{
            let user=await User.create({email,name,password});
            res.status(201).json(user);
        }catch(err){
            res.status(500).json(err);
        }

    }
}

module.exports=AuthController;