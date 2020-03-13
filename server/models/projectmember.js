'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model=sequelize.Sequelize.Model;

  class ProjectMember extends Model{

  }

  ProjectMember.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {sequelize,modelName:'ProjectMember'})


  ProjectMember.associate = function(models) {
    // associations can be defined here
  };
  return ProjectMember;
};