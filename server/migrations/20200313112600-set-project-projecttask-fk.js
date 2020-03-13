'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.addConstraint('ProjectTasks', ['projectId'], {
      type: 'foreign key',
      name: 'projecttask_project_fk',
      references: { //Required field
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.removeConstraint('ProjectTasks','projecttask_project_fk');
  }
};
