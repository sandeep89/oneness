var express = require('express');
var router = express.Router();
var middleware = require("../lib/middleware");
var auth = middleware.auth;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
