"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Application = db.define('application', {
// will likely add more!

// belongs to job
// has many stages
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
