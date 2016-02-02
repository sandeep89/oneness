// DAO file for session table 
var db = require("./db");
var sessionSchema = require("./schema").session;

if (process.config.database.create) {
    db.createTable(sessionSchema);
}

var session = module.exports = function() {
    var self = this;
    this.auth_token = "test" + Date.now();
    this.keys = {};
    this.active = true;
    this.create_time = Date.now();
    this.profiles = {};

    this.createSession = function(keys, profiles) {
        self.keys = keys;
        self.profiles = profiles;
        return self;
    }

    this.invalidateSession = function() {
        self.active = false;
        self.saveSession();
    }

    this.getSession = function(auth_token, cb) {
        var query = {
            TableName: sessionSchema.TableName,
            auth_token: auth_token
        }

        db.getData(query, function(err, val) {
            if (err) return cb(err);

            self.auth_token = val.auth_token;
            self.keys = val.keys;
            self.active = val.active;
            self.create_time = val.create_time;
            return cb(val);
        })
    }

    /*
     * Method to add a new session in singularity
     * data is a JSON object
     */
    this.saveSession = function(cb) {
        // TODO: Use a library to create requried auth_token for mapping
        var data = {
            TableName: sessionSchema.TableName,
            Item: self.returnSession()
        }
        db.putData(data, cb);
    }
    this.returnSession = function() {
        return {
            auth_token: self.auth_token,
            keys: self.keys,
            active: self.active,
            create_time: self.create_time,
            profiles: self.profiles
        }
    }
}