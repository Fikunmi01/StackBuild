const { Router } = require('express');
const {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getSinglePost,
    newComment,
    likeComment,
    quoteComment,
} = require('../../controller/user');

const jwt = require('jsonwebtoken');
const router = Router();

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

router.post('/', auth, createPost);
router.get('/', getPosts);

router.get('/:postId', getSinglePost);
router.post('/:postId/comment', auth, newComment);
router.post('/:postId/like', auth, likeComment);
router.post('/:postId/quote', auth, quoteComment);

router.put('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);

const PostRoutes = router;
module.exports = PostRoutes;
