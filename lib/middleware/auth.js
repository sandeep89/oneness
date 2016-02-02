// Module to create user auth info
var Session = require("../model").session;
var util = require('./util')

var auth = function() {
    this.createSession = function(userName, password, cb) {
        util.requestRayLogin(userName, password, function(err, authInfo) {
            if (err) return cb(err);
            var session = new Session();
            key = {
                placeholder: authInfo["userId"]
            };
            profile = {
                placeholder: authInfo
            }
            session = session.createSession(key, profile);
            session.saveSession(cb);
        });
    }
    return this;
}
module.exports = auth();