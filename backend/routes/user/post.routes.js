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
    likePost,
    dislikePost
} = require('../../controller/user');
const { auth } = require("../../middleware/auth");

const router = Router();

router.post('/', auth, createPost);
router.get('/', getPosts);

router.get('/:postId', getSinglePost);
router.post('/:postId/comment', auth, newComment);
router.post('/:postId/like-comment', auth, likeComment);
router.post('/:postId/quote', auth, quoteComment);

// Route to like a post
router.put("/like/:postId", auth, likePost);

// Route to dislike a post
router.put("/dislike/:postId", auth, dislikePost);

router.put('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);

module.exports = router;
