"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Application = db.define('application', {
    jobId: {
      type: Sequelize.UUID,
      references:{
        model:'job',
        key:'uuid',
      },
    },
    stageId: {
      type: Sequelize.UUID,
      references:{
        model:'stage',
        key:'uuid'
      }
    },
    dateApplied: {
      type: Sequelize.DATE,
      field: "date_applied"
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
  })
  return Application;
}
