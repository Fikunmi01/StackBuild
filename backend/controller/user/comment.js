const { body, validationResult } = require("express-validator");

const Post = require("../../model/post.model");
const Comment = require("../../model/comment.model");

// Create a new comment
const newComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const author = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({
      postId,
      text,
      author,
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Quote a comment
const quoteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { quote } = req.body;
    const author = req.user._id;

    const comment = await Comment.findOne({ _id: commentId, postId: postId });
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.quotes.push({ quote, author });
    await comment.save();

    res.json({
      message: "Comment quoted successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Like or unlike a comment
const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const userLikeIndex = comment.likes.indexOf(userId);
    if (userLikeIndex === -1) {
      // User hasn't liked the comment, so add the like
      comment.likes.push(userId);
    } else {
      // User has already liked the comment, so remove the like
      comment.likes.splice(userLikeIndex, 1);
    }

    await comment.save();

    res.json({
      message: "Comment like updated successfully",
      likes: comment.likes.length,
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  newComment,
  quoteComment,
  likeComment,
};
