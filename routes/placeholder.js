var express = require('express');
var router = express.Router();
var middleware = require("../lib/middleware");
var auth = middleware.auth;

/* GET users listing. */
router.get('/login', function(req, res, next) {
    auth.createSession("username", "password",
        function(err, session) {
            console.log(session);
            res.send('respond with a resource');
        })
});

module.exports = router;