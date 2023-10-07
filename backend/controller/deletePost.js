const PostModel = require('../model/postModel');

exports.deletePost = async (req, res, next) => {
    const { postId } = req.params;

    try {
        // Find the post by postId
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete the post
        await post.remove();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
