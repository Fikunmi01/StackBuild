const { Router } = require('express');
const { updateUser, profile, uploadDP } = require('../../controller/user');
const router = Router();
const { auth } = require('../../middleware/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post("/:userId/picture", uploadDP);
router.patch('/update', auth, updateUser);
router.get('/me/:id', auth, profile)

module.exports = router;
