'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegisteredEvent = sequelize.define('RegisteredEvent', {
    cartID: DataTypes.INTEGER,
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
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
    RegisteredEvent.belongsToMany(
      models.Event,
      { through: models.Register }
    );
  };
  return RegisteredEvent;
};
