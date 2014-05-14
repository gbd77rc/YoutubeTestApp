var path = require('path');
var rootPath = path.normalize(__dirname + "../../../");
var viewPath = path.normalize(rootPath + 'server/views');

module.exports = {
    dev:{
        rootPath:rootPath,
        viewPath:viewPath,
        port: process.env.PORT || 3031
    }
};