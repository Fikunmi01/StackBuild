const PostModel = require('../model/postModel');

exports.deletePost = async (req, res, next) => {
    const postId = req.params.postId.toString(); // Access postId from req.params


    try {
        // Find the post by postId
        const post = await PostModel.findOne({ postId: postId });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete the post
        await post.deleteOne();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
