'use strict';
module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('Register', {
    cartID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Register.associate = function(models) {
    // associations can be defined here
  };
  return Register;
};
