'use strict';
const { Validator } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validator:{
        len: [4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an Email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
      validator:{
        len: [3,256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validator:{
        len: [60, 60]
      }
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
