/*
    Module to set config properties for sigularity proxy server
*/

var fs = require('fs');

var config = function() {
    if (process.env.RUN_ENV) {
        fs.stat('./' + process.env.RUN_ENV + '.js', function(err, stat) {
            if (err == null) {
                return require("./" + process.env.RUN_ENV);
            } else if (err.code == 'ENOENT') {
                return require("./development");
            } else {
                console.log('Some error: ', err.code);
            }
        })
    } else {
        return require("./development");
    }
}

module.exports = config();