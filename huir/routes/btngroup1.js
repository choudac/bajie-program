var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('btngroup1', { title: '辉锐物流' });
});

module.exports = router;
