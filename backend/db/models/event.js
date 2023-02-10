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

  Event.getEvent = async function(type) {
    if (!type) {
      return await Event.findAll({order: ['createdAt', 'DESC']});
    } else {
      return await Event.findAll({ where: { eventType: type }, order: ['createdAt', 'DESC']});
    }
  }

  Event.addEvent = async function(params) {
    const title = params.eventTitle;
    const club = params.clubName;
    const type = params.eventType;
    const description = params.description;
    const location = params.location;
    const date = params.date;
    const inventory = params.ticketInventory;
    const newEvent =  await Event.create(
      {
        eventTitle: title,
        clubName: club,
        eventType: type,
        description: description,
        location: location,
        date: date,
        ticketInventory: inventory
      }
    )
    return newEvent;
  }

  return Event;
};
