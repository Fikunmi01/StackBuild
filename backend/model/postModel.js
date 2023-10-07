const mongoose = require('mongoose')

const postSchema = mongoose.schema({
    postId: { type: Number, unique: true },
    title: '',
    content: '',
    imgSrc:'',
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

postSchema.pre('save', async function (next) {
    const doc = this;

    try {
        const lastDoc = await mongoose.model('Post', postSchema)
            .findOne({}, {}, { sort: { adminId: -1 } })
            .exec();

        // Set the id for the new document
        doc.postId = lastDoc ? lastDoc.postId + 1 : 1; // Generate a unique ID for the new user
        next(); // Proceed to save the document
    } catch (err) {
        return next(err); // Handle any errors
    }
});

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel