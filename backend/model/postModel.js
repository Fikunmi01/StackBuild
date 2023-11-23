const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    postId: { type: String, unique: true },
    title: String,
    content: String,
    imgSrc: String,
    author: String,
    tag: String,
    comments: [{
        text: String,
        username: String,
        createdAt: {
            type: Date,
            default: new Date(),
        },
    }],

    createdAt: {
        type: Date,
        default: new Date(),
    }
})

postSchema.pre('save', async function (next) {
    const doc = this;

    try {
        if (!doc.isNew) {
            // Document is being updated, no need to change postId
            return next();
        }

        const lastDoc = await mongoose.model('Post', postSchema)
            .findOne({}, {}, { sort: { postId: -1 } })
            .exec();

        // Set the id for the new document
        const nextPostId = lastDoc ? parseInt(lastDoc.postId) + 1 : 1; // Convert to number and increment
        doc.postId = nextPostId.toString(); // Convert back to string
        next(); // Proceed to save the document
    } catch (err) {
        return next(err); // Handle any errors
    }
});


const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel
