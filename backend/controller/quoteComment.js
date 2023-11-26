const PostModel = require("../model/postModel");

exports.quoteComment = async (req, res, next) => {
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
        console.log("Comment quoted");
        res.json({ comment, username: req.user.username });
    } catch (err) {
        console.log(err); // Log any errors
        res.status(500).json({ error: err.message });
    }
};