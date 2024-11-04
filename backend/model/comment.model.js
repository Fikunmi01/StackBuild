const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    quotes: [{
        quote: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual fields for comment
commentSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

commentSchema.virtual('dislikeCount').get(function () {
    return this.dislikes.length;
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;