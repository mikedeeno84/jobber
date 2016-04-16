"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Contact = db.define('contact', {
    // belongs to company
    firstName: {
      type: Sequelize.STRING,
      field: "first_name"
    },
    lastName: {
      type: Sequelize.STRING,
      field: "last_name"
    },
    email:Sequelize.STRING,
    title:Sequelize.STRING,
    phone:Sequelize.STRING,
  });
  return Contact;
}
