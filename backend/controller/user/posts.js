const PostModel = require("../../model/post.model");

const createPost = async (req, res, next) => {
  const { title, content, imgSrc, commentText, tag, author } = req.body;

  try {
    // Create a new post
    const newPost = new PostModel({
      title,
      content,
      author,
      tag,
      imgSrc,
      comments: {},
    });

    // Add the initial comment to the new post
    newPost.comments.push({ text: commentText });

    // Save the new post with the initial comment
    await newPost.save();

    res.status(201).json({
      message: "Post and comment added successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
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
      post = await PostModel.findById(postId); 
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


// Define a route to search for posts
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
  const postId = req.params.postId.toString(); // Access postId from req.params

  try {
    // Find the post by postId
    const post = await PostModel.findOne({ postId: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the post
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  searchPost,
};
