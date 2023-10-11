const PostModel = require('../model/postModel');

exports.getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    // Fetch the post by postId from your database using the PostModel
    const post = await PostModel.find({postId:postId});

    if (!post) {
      // If the post with the given postId doesn't exist, return a 404 error
      return res.status(404).json({ error: 'Post not found' });
    }

    // Send the retrieved post data as a response
    res.json(post);
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
