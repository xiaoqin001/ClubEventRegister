'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.User);
    Cart.hasMany(models.RegisteredEvent);
    Cart.belongsToMany(
      models.Event,
      { through: models.Register }
    );
  };
  return Cart;
};
