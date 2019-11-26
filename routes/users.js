var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.all('/12345', function(req, res, next) {
  res.send(`${new Date().getTime()}    === 12345`);
});
router.all('/12345/permissions', function(req, res, next) {
  res.send(`${new Date().getTime()}    ===12345/permissions`);
});
router.all('/c', function(req, res, next) {
  res.send(`${new Date().getTime()}    ===ccccc`);
});
module.exports = router;
