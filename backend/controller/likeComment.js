const PostModel = require("../model/postModel");

exports.likeComment = async (req, res, next) => {
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
        console.log("Comment liked/unliked");
        res.json({ comment, likes: comment.likes, username: req.user.username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};