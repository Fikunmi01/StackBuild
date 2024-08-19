const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    imgSrc: String,
    author: String,
    tag: String,
    comments: [{
        text: String,
        username: String,
        likes: [String],
        quotes: [{
            quote: String,
            username: String
        }],
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

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel
