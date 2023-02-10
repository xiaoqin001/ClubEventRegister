'use strict';

const registeredevent = require("./registeredevent");

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
    Register.hasOne(registeredevent);
  };

  Register.registerEvent = async function(params) {
    const cart = params.cartID;
    const user = params.userID;
    const amount = params.amount;
    const newRegister = await Register.create(
      {
        cartID: cart,
        userID: user,
        amount: amount,
      }
    );
    return newRegister;
  }


  return Register;
};
