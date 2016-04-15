"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Contact = db.define('contact', {
    companyId: {
      type: Sequelize.UUID,
      references:{
        model:'company',
        key:'uuid',
      },
    },
    firstName: {
      type: Sequelize.STRING,
      field: "first_name"
    },
    lastName: {
      type: Sequelize.STRING,
      field: "last_name"
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    email:Sequelize.STRING,
    title:Sequelize.STRING,
    phone:Sequelize.STRING,
  });
  return Contact;
}
