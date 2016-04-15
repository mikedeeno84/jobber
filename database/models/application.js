"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Application = db.define('application', {
    jobId: {
      type:Sequelize.UUID,
      field:"job_id"
    },
    stageId: {
      type:Sequelize.UUID,
      field:"stage_id"
    },
    dateApplied:{
      type:Sequelize.DATE,
      field:"date_applied"
    }
  })
  return Application;
}
