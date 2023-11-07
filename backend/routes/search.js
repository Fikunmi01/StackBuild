var express = require('express');
const { searchPost } = require('../controller/searchPost');
var router = express.Router();

/* GET users listing. */
router.get('/', searchPost);

module.exports = router;
