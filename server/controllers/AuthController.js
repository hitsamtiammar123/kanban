const {User}=require('../models');
const {makeToken}=require('../helpers/token');
const md5=require('md5');

class AuthController{
    static async login(req,res){
        let {email,password}=req.body;

        try{
            let user=await User.loginUser(email,password);
            if(!user){
                res.status(400).json({message:'Email or Password is wrong'});
            }
            else{
                let tokenData=user.tokendata;
                let token=makeToken(tokenData);
                return res.status(200).json({token:token,user:tokenData});
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
            let tokendata=user.tokendata;
            let token=makeToken(tokendata);
            res.status(200).json({token:token,user:tokendata});

        }catch(err){
            console.log(err)
            res.status(500).json(err);
        }


    }

    static async editProfile(req,res){
        let body=req.body;
        try{
            let userId=req.user.id;
            if(body.password){
                body.password=md5(body.password);
            }
            let result=await User.update(body,{
                where:{id:userId}
            })
            if(result){
                let user=await User.findByPk(userId);
                res.status(200).json({message:'user has successfully updated',user:user.tokendata})
            }
            else{
                res.status(400).json({message:'Fail to update user'});
            }
        }catch(err){
            console.log(err);
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