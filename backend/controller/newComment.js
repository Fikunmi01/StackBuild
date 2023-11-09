const PostModel = require('../model/postModel'); // Import your Post model

// Define a route to post a new comment to a specific post
exports.newComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const postId = req.params.postId;

        // Find the post by its postId
        const post = await PostModel.findOne({ postId: postId });

        if (!post) {
            return res.status(404).json({ error: 'No comments found' });
        }

        if (!post.comments) {
            post.comments = {}
        }

        // Add the new comment to the post's comments array
        post.comments.push({ text });

        // Save the updated post document
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

