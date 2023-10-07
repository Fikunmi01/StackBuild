const PostModel = require('../model/postModel');

exports.createPost = async (req, res, next) => {
    const { title, content, imgSrc, commentText } = req.body;

    try {
        // Create a new post
        const newPost = new PostModel({ title, content, imgSrc });

        // Add the initial comment to the new post
        newPost.comments.push({ text: commentText });

        // Save the new post with the initial comment
        await newPost.save();

        res.status(201).json({ message: 'Post and comment added successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
