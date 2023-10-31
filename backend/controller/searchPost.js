const PostModel = require('../model/postModel'); // Import your Post model

// Define a route to search for posts
exports.searchPost = async (req, res, next) => {
    try {
        const query = req.query.query;

        const posts = await PostModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tag: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        return res.json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while searching for posts.' });
    }
};
