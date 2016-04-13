var chalk = require('chalk');
// connect to DB
// create app (require in express and and plug it into server)
// start server
var server = require('http').createServer();
var createApplication = function () {
	// require in express app
	var app = require('./app')
	// attach it
	server.on('request', app);
};
var startServer = function(){

  var PORT = process.env.PORT || 1337;
 server.listen(PORT, function(){
    console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));

 })

}
require('../database');
createApplication();
startServer();