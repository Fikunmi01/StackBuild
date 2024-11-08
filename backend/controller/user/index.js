// export * from "./auth";
// export * from "./comment";
// export * from "./posts";
// export * from "./upload";
// export * from "./user";

const { profile, updateUser, uploadDP } = require("../user/user");

const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getSinglePost,
  searchPost,
  likePost,
  dislikePost
} = require("./posts");

const { createUser, loginUser } = require("../user/auth");

const { newComment, likeComment, quoteComment } = require("../user/comment");

module.exports = {
  profile,
  updateUser,
  createPost,
  updatePost,
  deletePost,
  uploadDP,
  getPosts,
  getSinglePost,
  searchPost,
  createUser,
  loginUser,
  newComment,
  likeComment,
  quoteComment,
  likePost,
  dislikePost
};
