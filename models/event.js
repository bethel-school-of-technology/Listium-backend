"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      eventId: {
        type: DataTypes.INTEGER(3).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      eventType: {
          
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "events",
    }
  );
  events.associate = function (models) {
    // associations can be defined here
  };
  return events;
};
