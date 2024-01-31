const { body, validationResult } = require('express-validator');
const PostModel = require('../../model/post.model');
const validator = require('validator');

const newComment = [
    // Validate and sanitize the text field.
    body('text')
        .trim() // Remove leading/trailing whitespace
        .isLength({ min: 1 })
        .withMessage('Text must be specified.')
        .escape(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { text } = req.body;
            const postId = req.params.postId;
            const username = req.user.username;

            // Find the post by its postId
            const post = await PostModel.findOne({ postId: postId });

            if (!post) {
                return res.status(404).json({ error: 'No comments found' });
            }

            // Add the new comment to the post's comments array
            post.comments.push({ text, username });

            // Save the updated post document
            await post.save();

            res.status(201).json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
];

const quoteComment = async (req, res, next) => {
    try {
        console.log(req.body); // Log the request body
        const { postId } = req.params;
        const { commentId, quote } = req.body;
        const post = await PostModel.findOne({ postId });
        if (!post) {
            console.log(`Post with ID ${postId} not found`); // Log if post not found
        }
        const comment = post.comments.id(commentId);
        if (!comment) {
            console.log(`Comment with ID ${commentId} not found`); // Log if comment not found
        }
        comment.quotes.push({ quote, username: req.user.username });
        await post.save();
        console.log('Comment quoted');
        res.json({ comment, username: req.user.username });
    } catch (err) {
        console.log(err); // Log any errors
        res.status(500).json({ error: err.message });
    }
};

const likeComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { commentId } = req.body;
        const post = await PostModel.findOne({ postId });
        const comment = post.comments.id(commentId);
        const userIndex = comment.likes.indexOf(req.user._id);
        if (userIndex === -1) {
            // User has not liked the comment yet, so add their ID to the likes array
            comment.likes.push(req.user._id);
        } else {
            // User has already liked the comment, so remove their ID from the likes array
            comment.likes.splice(userIndex, 1);
        }
        await post.save();
        console.log('Comment liked/unliked');
        res.json({
            comment,
            likes: comment.likes,
            username: req.user.username,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    newComment,
    quoteComment,
    likeComment,
};
