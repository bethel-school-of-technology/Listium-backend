"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      id: {
        type: DataTypes.INTEGER(3).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
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
