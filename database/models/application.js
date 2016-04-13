"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Application = db.define('application', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    companyId: {
      type: Sequelize.UUID,
      field: 'company_id'
    },
    contact_id: Sequelize.UUID,
    stage_id: Sequelize.UUID,
    needToFollowUP: Sequelize.BOOLEAN,
    status: Sequelize.STRING
  })
  return Application;
}
