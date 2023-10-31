var express = require('express');
const { searchPost } = require('../controller/searchPost');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/search', searchPost);

module.exports = router;
