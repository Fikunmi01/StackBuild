const { Router } = require('express');
const { updateUser, profile, uploadDP } = require('../../controller/user');
const router = Router();

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log('Token:', token); // Log the token
    if (!token)
        return res.status(401).send('Access denied. No token provided.');

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
router.post("/:userId/picture", uploadDP);
router.put('/update/:id', auth, updateUser);
router.get('/me/:id', auth, profile)

module.exports = router;
