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
const { auth } = require("../../middleware/auth");

const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);

router.get('/:postId', getSinglePost);
router.post('/:postId/comment', auth, newComment);
router.post('/:postId/like', auth, likeComment);
router.post('/:postId/quote', auth, quoteComment);

router.put('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);

module.exports = router;
