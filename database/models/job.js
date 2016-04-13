"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Job = db.define('Job', {
    companyName: {
      type: Sequelize.STRING,
      field: 'company_name',
    },
    applied: {
      type: Sequelize.BOOLEAN
    },
    dateApplied: {
      type: Sequelize.DATEONLY,
      field: "date_applied"
    },
    app_id:Sequelize.UUID,
  })
  return Job;
}
