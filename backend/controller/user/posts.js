const PostModel = require("../../model/post.model");

const createPost = async (req, res) => {
  try {
    const { title, content, imgSrc, tag } = req.body;

    // Check if user exists in request (auth middleware check)
    if (!req.user?._id) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Basic validation
    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required"
      });
    }

    const newPost = new PostModel({
      title: title.trim(),
      content: content.trim(),
      author: req.user._id,
      tag: tag?.trim().toLowerCase(),
      imgSrc: imgSrc?.trim(),
    });

    const savedPost = await newPost.save();

    // Populate author information
    const populatedPost = await PostModel.findById(savedPost._id)
      .populate('author', 'username firstName lastName')  // Only select needed fields
      .lean();  // Convert to plain JavaScript object

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost
    });

  } catch (error) {
    console.error('Create Post Error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors)
          .map(err => err.message)
          .join(', ')
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: "Invalid ID format"
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to create post. Please try again."
    });
  }
};

// Optional: Add a utility function for validation
const validatePost = (title, content) => {
  const errors = [];

  if (!title?.trim()) {
    errors.push("Title is required");
  }

  if (title?.length > 200) {
    errors.push("Title must be less than 200 characters");
  }

  if (!content?.trim()) {
    errors.push("Content is required");
  }

  return errors;
};



const getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const searchQuery = req.query.search;

    let post;

    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      post = await PostModel.findOne({
        _id: postId,
        $or: [
          { title: regex },
          { content: regex },
          { tag: regex },
          { author: regex },
          { 'comments.text': regex }
        ]
      });
    } else {
      post = await PostModel.findById(postId).populate('likes', "firstname, lastname");
    }

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPosts = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;

    let filter = {};

    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      filter = {
        $or: [
          { title: regex },
          { content: regex },
          { tag: regex },
          { comments: { $elemMatch: { text: regex } } },
          { imgSrc: regex }
        ]
      };
    }

    const posts = await PostModel.find(filter);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};


const searchPost = async (req, res, next) => {
  try {
    const query = req.query.q;

    const posts = await PostModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    console.log(posts);
    return res.json(posts);
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ error: "An error occurred while searching for posts." });
  }
};

const updatePost = async (req, res, next) => {
  const { title, content, imgSrc } = req.body;
  const postId = req.params.postId.toString(); // Access postId from req.params

  try {
    // Find the post by postId
    const post = await PostModel.findOne({ postId: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
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

    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deletePost = async (req, res, next) => {
  const postId = req.params.postId.toString();

  try {
    const post = await PostModel.findOne({ postId: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.postId.toString();
  const userId = req.user._id;

  try {
    // First find the post
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    // Check if user has already liked
    const alreadyLiked = post.likes.includes(userId);

    // Use update based on whether already liked or not
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      alreadyLiked
        ? {
          $pull: { likes: userId } // Remove like if already liked
        }
        : {
          $pull: { dislikes: userId }, // Remove from dislikes if present
          $addToSet: { likes: userId } // Add to likes
        },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: alreadyLiked ? "Like removed successfully" : "Post liked successfully",
      post: updatedPost
    });

  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
};

const dislikePost = async (req, res) => {
  const postId = req.params.postId.toString();
  const userId = req.user._id;

  try {
    // First find the post
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        error: "Post not found"
      });
    }

    // Check if user has already disliked
    const alreadyDisliked = post.dislikes.includes(userId);

    // Use update based on whether already disliked or not
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      alreadyDisliked
        ? {
          $pull: { dislikes: userId } // Remove dislike if already disliked
        }
        : {
          $pull: { likes: userId }, // Remove from likes if present
          $addToSet: { dislikes: userId } // Add to dislikes
        },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: alreadyDisliked ? "Dislike removed successfully" : "Post disliked successfully",
      post: updatedPost
    });

  } catch (error) {
    console.error('Dislike post error:', error);
    res.status(500).json({
      error: "Server error",
      details: error.message
    });
  }
};


module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  searchPost,
  likePost,
  dislikePost,
};
