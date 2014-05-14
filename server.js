var express = require('express');
var stylus = require('stylus');

var env = process.env.NODE_ENV = process.env.NODE_ENV || "dev";

var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app,config);
require('./server/config/routes')(app);

app.listen(config.port);

console.log('Environment Mode   : ' + env);
console.log('Root               : ' + config.rootPath);
console.log('Views              : ' + config.viewPath);
console.log('Listening on port  : ' + config.port);