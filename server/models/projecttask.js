'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;

  class ProjectTask extends Model{

  }

  ProjectTask.init({
    task: DataTypes.STRING,
    type: DataTypes.ENUM,
    projectId: DataTypes.INTEGER
  }, {sequelize,modelName:'ProjectTask'})

  ProjectTask.associate = function(models) {
    // associations can be defined here

    ProjectTask.belongsTo(models.Project,{foreignKey:'projectId'})
  };
  return ProjectTask;
};