var express = require('express');
const { loginUser } = require('../controller/loginUser');
const { createUser } = require('../controller/createUser');
const { updateUser } = require('../controller/updateUser');
const auth = require('../middleware/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', loginUser)
router.post('/create-account', createUser)
router.put('/update/:id', updateUser)

module.exports = router;
