'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "events", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "events",
    "created": "2020-04-29T21:28:29.740Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "events",
        {
            "id": {
                "type": Sequelize.INTEGER(3).UNSIGNED,
                "field": "id",
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "eventName": {
                "type": Sequelize.STRING,
                "field": "eventName",
                "allowNull": false
            },
            "eventCategory": {
                "type": Sequelize.STRING,
                "field": "eventCategory",
                "allowNull": false
            },
            "eventDate": {
                "type": Sequelize.DATE,
                "field": "eventDate",
                "allowNull": false
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
