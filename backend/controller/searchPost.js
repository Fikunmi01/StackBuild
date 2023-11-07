const PostModel = require('../model/postModel'); // Import Post model

// Define a route to search for posts
exports.searchPost = async (req, res, next) => {
    try {
        const query = req.query.q;

        const posts = await PostModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { tag: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });
        console.log(posts);
        return res.json(posts);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while searching for posts.' });
    }
};
