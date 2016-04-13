"use strict";

var Sequelize = require('sequelize');

module.exports = function(db) {
  var Contact = db.define('contact', {
    contac_id:Sequelize.UUID,
    email:Sequelize.STRING,
    phone:Sequelize.STRING,
  })
  return Contact
}

