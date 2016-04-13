"use strict";

var Sequelize = require('sequelize');

module.exports = function (db) {
	var Company = db.define('company',{
		name: Sequelize.STRING,
		description: Sequelize.TEXT,
		industry: Sequelize.STRING,
		phone: Sequelize.STRING,
		address:Sequelize.STRING,
		uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    }
	});
	return Company
}