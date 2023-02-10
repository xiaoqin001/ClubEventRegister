'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userID: {
      type: DataTypes.INTEGER,
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

  // static method
  Cart.getCart = async function(userID) {

    return await Cart.findOne({ where: { UserID: userID }, include: RegisteredEvent });
  }
  Cart.createCart = async function(userID) {
    const cart = await Cart.create({
      userID,
    })
    return await Cart.findOne({ where: { UserID: userID } });
  }


  return Cart;
};
