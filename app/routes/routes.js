var express = require('express');
var router = express.Router();

router.use(require('./auth'));
router.use(require('./main'));

module.exports = router;
