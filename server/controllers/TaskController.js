const {Task}=require('../models');
const {decodeToken}=require('../helpers/token');

class TaskController{
    static async create(req,res){
        let userId=req.user.id;
        let {task,type}=req.body;

        try{
            let taskObj=await Task.create({type:type,task:task,userId:userId});
            res.status(201).json(taskObj);
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }

    static async fetchById(req,res){
        let userId=req.user.id;

        try{
            let types=['Back-log','To-Do','Doing','Done'];
            let tasks={};

            for(let i=0;i<types.length;i++){
                let type=types[i];
                tasks[type]=await Task.findAll({
                    where:{userId:userId,type:type}
                });
            }

            res.status(200).json(tasks);
        }catch(err){
            res.status(500).json(err);
        }

    }

    static async update(req,res){
        let body=req.body;
        let taskId=req.params.id;

        try{
            let result=await Task.update(body,{where:{id:taskId}});
            if(result){
                res.status(200).json({message:'Task has been successfully updated'});
            }
            else{
                res.status(406).json({message:'Fail to update task'});
            }

        }catch(err){
            res.status(500).json(err);
        }
    }

    static async delete(req,res){
        let taskId=req.params.id;

        try{
            let result=await Task.destroy({where:{id:taskId}})
            res.status(200).json({result});
        }catch(err){
            res.status(500).json(err);
        }

    }
}

module.exports=TaskController;