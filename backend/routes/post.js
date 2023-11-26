var express = require('express');
const { createPost } = require('../controller/createPost');
const { updatePost } = require('../controller/updatePost');
const { deletePost } = require('../controller/deletePost');
const { getPosts } = require('../controller/fetchPost');
const { getSinglePost } = require('../controller/fetchSingle');
const { newComment } = require('../controller/newComment');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { likeComment } = require('../controller/likeComment');
const { quoteComment } = require('../controller/quoteComment');

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

/* GET post listing. */
router.get('/', getPosts);

router.get('/:postId', getSinglePost);
router.post('/:postId/comment', auth, newComment);
router.post('/:postId/like', auth, likeComment);
router.post('/:postId/quote', auth, quoteComment);
router.post('/create-post', auth, createPost);

router.put('/update-post/:postId', auth, updatePost);
router.delete('/delete-post/:postId', auth, deletePost);



module.exports = router;
