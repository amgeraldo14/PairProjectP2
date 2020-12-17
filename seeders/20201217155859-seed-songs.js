'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let song = require("../songs.json")
   song.forEach(el => {
     el.createdAt = new Date()
     el.updatedAt = new Date()
   })

   return queryInterface.bulkInsert('Songs', song, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Songs', null, {})
  }
};
