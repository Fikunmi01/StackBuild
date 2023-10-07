const PostModel = require('../model/postModel');

exports.updatePost = async (req, res, next) => {
    const { postId, title, content, imgSrc } = req.body;

    try {
        // Find the post by postId
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update post properties if provided
        if (title) {
            post.title = title;
        }

        if (content) {
            post.content = content;
        }

        if (imgSrc) {
            post.imgSrc = imgSrc;
        }

        // Save the updated post
        await post.save();

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
