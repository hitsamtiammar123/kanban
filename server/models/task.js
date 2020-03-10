'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;

  class Task extends Model{

  }

  Task.init({
    type: DataTypes.ENUM(['Back-log','To-Do','Doing','Done']),
    task: DataTypes.STRING,
    point: DataTypes.INTEGER,
    assignedTo: DataTypes.STRING,
    userId:DataTypes.INTEGER
  },{sequelize,modelName:'Task'});

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User,{foreignKey:'userId'});
  };
  return Task;
};