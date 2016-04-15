"use strict";
var Sequelize = require('sequelize');

module.exports = function(db) {
  var Job = db.define('job', {
    companyId: {
      type: Sequelize.UUID,
      references:{
        model:'company',
        key:'uuid',
      },
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
