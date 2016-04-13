"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Person = db.define('person', {
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
    company: Sequelize.STRING,
  })
  return Person;
}
