const {Task}=require('../models');

module.exports=(req,res,next)=>{
    let user=req.user;
    if(user){
        let taskId=req.params.id;
        let userId=user.id;
        (async function(){
            try{
                let task=await Task.findByPk(taskId);
                if(task.userId!==userId){
                    res.status(403).json({message:'Unauthorizated'})
                }
                else{
                    next();
                }
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            }
        })();
    }
    else{
        res.status(401).json({message:'Unauthenticated'});
    }

}