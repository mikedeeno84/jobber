var express = require('express');
var app = express();
var path = require('path');
require('./configure')(app);
app.use('/api', require('./routes'));
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, './views/index.html'));
})
module.exports = app;