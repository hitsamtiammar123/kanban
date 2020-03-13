'use strict';
module.exports = (sequelize, DataTypes) => {
  
  const Model=sequelize.Sequelize.Model;

  class Project extends Model{

  }

  Project.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {sequelize,modelName:'Projects'})

  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.User,{foreignKey:'userId'});
    Project.hasMany(models.ProjectTask,{foreignKey:'projectId'});
    Project.belongsToMany(models.User,{as:'ProjectMember',through:'ProjectMembers',foreignKey:'userId'});
    
  };
  return Project;
};