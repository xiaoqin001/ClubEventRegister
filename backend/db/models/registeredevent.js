'use strict';
const { Cart } = require('../../db/models');
const { User } = require('../../db/models');
const { Register } = require('../../db/models');
const { Event } = require('../../db/models');

module.exports = (sequelize, DataTypes) => {
  const RegisteredEvent = sequelize.define('RegisteredEvent', {
    cartID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  }, {});
  RegisteredEvent.associate = function(models) {
    // associations can be defined here
    RegisteredEvent.belongsTo(models.Cart);
    RegisteredEvent.belongsTo(models.User);
    // RegisteredEvent.belongsTo(models.Register);
    RegisteredEvent.belongsToMany(
      models.Event,
      { through: models.Register }
    );
  };

  RegisteredEvent.register = async function(params) {
    const cart = params.cartID;
    const user = params.userID;
    const amount = params.amount;
    const event = params.eventID;
    const register = params.registerID;
    const newRegisterEvent = await RegisteredEvent.create(
      {
        cartID: cart,
        userID: user,
        amount: amount,
        eventID: event,
        registerID: register
      }
    );
    // const cart1 = await Cart.findByPk(cart);
    // const user1 = await User.findByPk(user);
    // const register1 = await Register.findByPk(registerID);
    // const event1 = await Event.findByPk(event);

    // cart1.addRegisteredEvent(newRegister);
    // user1.addRegisteredEvent(newRegister);
    // register1.addRegisteredEvent(newRegister);;
    // event1.addRegisteredEvent(newRegister);

    return newRegisterEvent;
  }

  return RegisteredEvent;
};
