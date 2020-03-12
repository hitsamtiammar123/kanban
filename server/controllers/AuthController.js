const {User}=require('../models');
const {makeToken}=require('../helpers/token');

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

    static async loginWithGoogle(req,res){

        let {name,email,login_token}=req.body;

        try{
            let user=await User.findOne({where:{google_token:login_token}});
            if(!user){
                user=await User.create({name,email,google_token:login_token,password:'dari_google'});
            }

            let token=makeToken({id:user.id,email:user.email,name:user.name});
            res.status(200).json({token:token});

        }catch(err){
            console.log(err)
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