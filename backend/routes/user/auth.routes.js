const { Router } = require('express');
const { loginUser, createUser } = require('../../controller/user');
const router = Router();

router.post('/login', loginUser);
router.post('/signup', createUser);

const AuthRoutes = router;
module.exports = AuthRoutes;