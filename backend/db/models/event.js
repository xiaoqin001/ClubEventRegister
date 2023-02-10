'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketInventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsToMany(
      models.User,
      { through: models.Register }
    );
    Event.belongsToMany(
      models.Cart,
      { through: models.Register }
    );
    Event.belongsToMany(
      models.RegisteredEvent,
      { through: models.Register }
    );
  };
  return Event;
};
