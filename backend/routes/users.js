var express = require('express');
const { loginUser } = require('../controller/loginUser');
const { createUser } = require('../controller/createUser');
const { updateUser } = require('../controller/updateUser');
const { profile } = require('../controller/profile');
var router = express.Router();

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  console.log('Token:', token); // Log the token
  if (!token) return res.status(401).send('Access denied. No token provided.');


  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Decoded:', decoded); // Log the decoded object
    req.user = decoded;

    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }


}

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', loginUser)
router.post('/create-account', createUser)
router.put('/update/:id', auth, updateUser)
// router.get('/me/:id', auth, profile)

module.exports = router;
