'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/hashPassword.js');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Song, {
        through: models.UserSong,
        foreignKey: "user_id"
      })
    }
    formatAge(){
      return `${this.age} years old`
    }
  };
  User.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate : (instance, option) => {
        instance.password = hashPassword(instance.password)
        console.log(instance.password, 'ini hookkkssssssssssss')
      }
    }
  });
  return User;
};