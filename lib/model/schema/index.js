// Loader script for model schemas, eventually we can generalize this

module.exports = (function() {
    var session = require("./session");
    return {
        session: session
    }
})();