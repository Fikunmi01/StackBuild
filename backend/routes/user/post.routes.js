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

// POST: Create a new post
router.post('/', auth, createPost);

// GET: Retrieve all posts
router.get('/', getPosts);

// GET: Retrieve a single post by ID
router.get('/:postId', getSinglePost);

// POST: Add a new comment to a post
router.post('/:postId/comment', auth, newComment);

// POST: Like a comment on a post
router.post('/:postId/like-comment', auth, likeComment);

// POST: Quote a comment on a post
router.post('/:postId/quote', auth, quoteComment);

// PUT: Like a post
router.put('/:postId/like', auth, likePost);

// PUT: Dislike a post
router.put('/:postId/dislike', auth, dislikePost);

// PUT: Update a post by ID
router.put('/:postId', auth, updatePost);

// DELETE: Delete a post by ID
router.delete('/:postId', auth, deletePost);

module.exports = router;