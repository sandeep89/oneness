// Schema defination for storing use session in singlarity

var session = {
        TableName: process.config.database.name + "_session",
        KeySchema: [{
                AttributeName: "auth_token",
                KeyType: "HASH"
            }
        ],
        AttributeDefinitions: [{
            AttributeName: "auth_token",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };

module.exports = session;