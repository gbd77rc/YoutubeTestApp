var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var logger = require('morgan');

module.exports = function(app, config){
    function compile(str, path){
        return stylus(str).set("filename", path);
    }

    app.set('views', config.viewPath );
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(bodyParser());
    app.use(stylus.middleware({
        src:config.rootPath + '/public',
        compile: compile
    }));
    app.use(express.static(config.rootPath + "/public"));
};