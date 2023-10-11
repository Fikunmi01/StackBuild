const PostModel = require('../model/postModel')


exports.getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find(); // Retrieve all posts from the database
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
};

