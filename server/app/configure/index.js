var path = require('path');
var express = require('express');
module.exports = function (app) {
	var rootPath = path.join(__dirname, '../../../');
	app.use(express.static(path.join(rootPath, './public')))
	app.use(express.static(path.join(rootPath, './public')))
	app.use(express.static(path.join(rootPath, './node_modules')))
}