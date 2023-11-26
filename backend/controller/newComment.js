const { body, validationResult } = require('express-validator');
const PostModel=require('../model/postModel')
const validator = require('validator');

exports.newComment = [
    // Validate and sanitize the text field.
    body('text')
        .trim() // Remove leading/trailing whitespace
        .isLength({ min: 1 }).withMessage('Text must be specified.')
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
    }
];