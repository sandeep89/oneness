// Module to perform Request for login
var request = require("request");

var util = function() {
    // username and password is placeholder and can be used for login if requried
    this.requestRayLogin = function(username, password, cb) {
        request
            .get({
                    url: process.config.placeholder.apiUrl + '/posts/1',
                },
                function(err, response, body) {
                    if (err) {
                        return cb(err);
                    }
                    if ([201, 200].indexOf(response.statusCode) > -1 ) {
                        return cb(null, body)
                    } else {
                        return cb(new Error("Invalid response from server"));
                    }
                });
    }
    return this;
}

module.exports = util();