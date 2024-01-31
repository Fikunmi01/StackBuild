const {
    profile,
    updateUser
} = require('../user/user');

const {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getSinglePost,
    searchPost
} = require('../User/post');

const {
    createUser,
    loginUser
} = require('../User/auth');

const {
    newComment,
    likeComment,
    quoteComment
} = require('../User/comment');

module.exports = {
    profile,
    updateUser,
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getSinglePost,
    searchPost,
    createUser,
    loginUser,
    newComment,
    likeComment,
    quoteComment
}
