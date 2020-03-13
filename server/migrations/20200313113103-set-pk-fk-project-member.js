'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return Promise.all([
        queryInterface.addConstraint('ProjectMembers', ['userId'], {
          type: 'foreign key',
          name: 'users_userId_fk',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
      }),
      queryInterface.addConstraint('ProjectMembers', ['projectId'], {
        type: 'foreign key',
        name: 'projects_projectId_fk',
        references: { //Required field
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    })

     ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return Promise.all([
       queryInterface.removeConstraint('ProjectMembers','users_userId_fk'),
       queryInterface.removeConstraint('ProjectMembers','projects_projectId_fk')
     ]);
  }
};
