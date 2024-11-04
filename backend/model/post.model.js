const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true // Remove whitespace from ends
    },
    content: { 
        type: String, 
        required: true 
    },
    imgSrc: { 
        type: String,
        validate: {
            validator: function(v) {
                // Basic URL validation
                return !v || /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true // Add index for faster queries
    },
    tag: { 
        type: String,
        lowercase: true, // Convert tags to lowercase
        index: true
    },
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    dislikes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    views: { 
        type: Number, 
        default: 0,
        min: 0 // Ensure views can't be negative
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        immutable: true // Prevent modification after creation
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true // Automatically handle updatedAt
});

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

// Virtual for dislike count
postSchema.virtual('dislikeCount').get(function() {
    return this.dislikes.length;
});

// Virtual for comment count
postSchema.virtual('commentCount', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId',
    count: true
});

// Index for text search
postSchema.index({ title: 'text', content: 'text' });

// Pre-save middleware to update timestamps
postSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Method to check if a user has liked the post
postSchema.methods.isLikedByUser = function(userId) {
    return this.likes.includes(userId);
};

// Method to check if a user has disliked the post
postSchema.methods.isDislikedByUser = function(userId) {
    return this.dislikes.includes(userId);
};

// Static method to find popular posts
postSchema.statics.findPopular = function(limit = 10) {
    return this.find()
        .sort({ views: -1, likeCount: -1 })
        .limit(limit)
        .populate('author', 'username');
};

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;