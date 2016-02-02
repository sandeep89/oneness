// File containing the CURD operation of dynamo db
var AWS = require("aws-sdk");
var db = module.exports;

AWS.config.update({
    region: process.config.database.region,
    endpoint: process.config.database.endpoint
});

db.createTable = function(schema) {
    var dynamodb = new AWS.DynamoDB();

    dynamodb.createTable(schema, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:",
                JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:",
                JSON.stringify(data, null, 2));
        }
    });
}

db.putData = function(params, cb) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.put(params, function(err, val) {
        if (err) return cb(err);
        else return cb(null, val);
    });
}

db.getData = function(query, cb) {
    var docClient = new AWS.DynamoDB.DocumentClient();

    docClient.get(query, function(err, val) {
        if (err) return cb(err);
        else return cb(null, val);
    });

}