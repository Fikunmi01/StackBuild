var express = require('express');
const { createPost } = require('../controller/createPost');
const { updatePost } = require('../controller/updatePost');
const { deletePost } = require('../controller/deletePost');
const { getPosts } = require('../controller/fetchPost');
const { getSinglePost } = require('../controller/fetchSingle');
const { newComment } = require('../controller/newComment');
var router = express.Router();

/* GET post listing. */
router.get('/', getPosts, function (req, res, next) {
    res.send('fetch all posts');
});
// router.post('/search', searchPost);
router.get('/', getPosts);
router.get('/:postId', getSinglePost);
router.post('/:postId/comment', newComment);
router.post('/create-post', createPost);
router.put('/update-post/:postId', updatePost);
router.delete('/delete-post/:postId', deletePost);


module.exports = router;
