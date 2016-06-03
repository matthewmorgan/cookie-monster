var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  process.env.visitCounter++;
  res.render('index', {'visits': process.env.visitCounter || 1});
});

module.exports = router;
