'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', 
      [
            {
                "id":"1",
                "name":"java",
                "description":"logibooks",
                "createdAt": new Date(),
                "updatedAt": new Date ()
            },
            {
                "id":"2",
                "name":"python",
                "description":"logibooks",
                "createdAt": new Date(),
                "updatedAt": new Date ()
            },
            {
                "id":"3",
                "name":"c++",
                "description":"logibooks",
                "createdAt": new Date(),
                "updatedAt": new Date ()
            },
            {
                "id":"4",
                "name":"ruby",
                "description":"logibooks",
                "createdAt": new Date(),
                "updatedAt": new Date ()
            },

        ]
    );
    
  },

  async down (queryInterface, Sequelize) {
   
     return queryInterface.bulkDelete('Categories', null, {});
     
  }
};
