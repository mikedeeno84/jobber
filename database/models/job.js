"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Job = db.define('Job', {
    companyId: {
      type: Sequelize.UUID,
    },
    applied: {
      type: Sequelize.BOOLEAN,
    },
    title:{
      type:Sequelize.STRING,
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
  })
  return Job;
}
