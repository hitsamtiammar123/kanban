'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;
  const md5=require('md5');

  class User extends Model{

    static loginUser(email,password){
      
      return User.findOne({where:{email:email,password:md5(password)}})
    }

    get tokendata(){
      return {
        id:this.id,
        email:this.email,
        name:this.name
      }
    }
  }

  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    google_token:DataTypes.STRING
  }, {sequelize,modelName:'User'})


  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task,{foreignKey:'userId'})
  };

  User.addHook('beforeCreate', (user, options) => {
    user.password = md5(user.password);
  });
  


  return User;
};