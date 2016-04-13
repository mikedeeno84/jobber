"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Stage = db.define('stage', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    name: Sequelize.STRING,
    date: Sequelize.DATE,
    completed: Sequelize.BOOLEAN,
    notes: Sequelize.TEXT,
    followedUp: {
    	type:Sequelize.BOOLEAN,
    	field:'followed_up' 
    }
  })
  return Stage;
}
