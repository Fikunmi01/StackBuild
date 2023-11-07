var express = require('express');
const { loginUser } = require('../controller/loginUser');
const { createUser } = require('../controller/createUser');
const { updateUser } = require('../controller/updateUser');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-account', createUser)
router.post('/login', loginUser)
router.put('/update/:id', updateUser)

module.exports = router;
