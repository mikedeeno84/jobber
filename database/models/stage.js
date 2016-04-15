"use strict";

var Sequelize = require('sequelize');


module.exports = function(db) {
  var Stage = db.define('stage', {
    jobId: {
      type: Sequelize.UUID,
      references:{
        model:'job',
        key:'uuid',
      },
    },
    stageName: {
      type:Sequelize.STRING,
      field:"stage_name"
    },
    date: Sequelize.DATE,
    completed: Sequelize.BOOLEAN,
    notes: Sequelize.TEXT,
    followedUp: {
    	type:Sequelize.BOOLEAN,
    	field:'followed_up' 
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
  })
  return Stage;
}
