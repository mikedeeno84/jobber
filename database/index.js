var Sequelize = require('sequelize');
var jobberDB = new Sequelize ('jobber', null, null,
	{
		dialect: 'postgres',
		port:5432
	});

jobberDB
	.authenticate()
	.then(function () {
		console.log('connection successful')
	})
	.catch(function(err){
		console.log('connection failed', err)
	});

var Job = require('./models/Job')(jobberDB);
var Company = require('./models/Company')(jobberDB);
var Person = require('./models/Person')(jobberDB);
var Contact = require('./models/Contact')(jobberDB);
var Application = require('./models/Application')(jobberDB);
var Stage = require('./models/Stage')(jobberDB);

// sequelize.sync();
module.exports = {
	Job:Job,
	Company: Company,
	Person: Person,
	Application:Application,
	Contact:Contact,
	Stage: Stage
}