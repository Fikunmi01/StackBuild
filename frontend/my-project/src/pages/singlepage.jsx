import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingle } from "../features/post/singleSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { postComment } from "../features/post/commentSlice";
import TextEditor from "../components/textEditor";
import { likeComment, quoteComment } from "../features/post/commentSlice";

export const SinglePost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost);
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const [quote, setQuote] = useState("");
  const [quoteBox, setQuoteBox] = useState(false);
  const [quoteBoxCommentId, setQuoteBoxCommentId] = useState(""); // This is the commentId of the comment that is being quoted
  const [isLiked, setIsLiked] = useState("");
  const user = useSelector((state) => state.user);
  const commentArray = Object.values(
    useSelector((state) => state.comment.comment)
  );

  const [likedComments, setLikedComments] = useState([]);

  // Toggle like status
  const toggleLike = (commentId) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
    } else {
      setLikedComments([...likedComments, commentId]);
    }
  };

  useEffect(() => {
    // Fetch the individual post data when the component mounts
    dispatch(fetchSingle(postId));
    if (postComment.fulfilled) {
      dispatch(fetchSingle(postId));
    }
  }, [postId]);

  useEffect(() => {
    // update the nnumber of likes

    dispatch(fetchSingle(postId));
    dispatch(fetchSingle(comment._id));
  }, [comment.likes]);

  useEffect(() => {
    // Re-render the component when the post.singlePost object changes
  }, [post.singlePost]);

  const handleComment = (comment) => {
    if (comment.trim() !== "") {
      dispatch(postComment({ text: comment, postId }));
      setComment("");
    }
  };

  const toggleQuoteBox = () => {
    setQuoteBox(!quoteBox);
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <div>
        {post.singlePost.map((item, index) => (
          <>
            <Navbar />

            <div
              key={index}
              className="px-4 w-full items-center flex justify-center flex-col "
            >
              <img src={item.imgSrc} alt="" className="w-[100vh] mb-10" />
              <h2 className="font-serif text-3xl w-2/4 text-center leading-normal mx-auto font-bold">
                {item.title}
              </h2>
              <span className="flex text-lightGray text-xl gap-4 items-center mb-4">
                <p>{item.author}</p>
                <img src="/assets/Ellipse1.png" alt="" />
              </span>

              <p className="text-lightGray mb-4 font-sans">
                #technology #tech #career
              </p>

              <p className="px-80 font-sans leading-normal">{item.content}</p>
            </div>

            {isAuthenticated ? (
              <>
                <div className="pt-16 flex flex-col gap-y-4">
                  <TextEditor
                    setComment={setComment}
                    handleComment={handleComment}
                    comment={comment}
                  />
                </div>
              </>
            ) : (
              <p className="mx-80 relative m-auto p-4">
                You need to <Link to="/user/login" className="underline">login</Link> before you can
                comment
              </p>
            )}
            <div className="mx-80 relative m-auto px-4 flex flex-col gap-20 py-16">
              <div>
                <h1 className="font-serif text-2xl">Comments</h1>

                {!Object.keys(item.comments).length > 0 ? (
                  <div className="font-sans">
                    <p>There's no comment available</p>
                    <p>
                      {!isAuthenticated && (
                        <>
                          <Link to="/user/login" className="border-b-2">
                            Login
                          </Link>{" "}
                          to write a comment
                        </>
                      )}
                    </p>
                  </div>
                ) : (
                  Object.values(item.comments).map((comment, index) => {
                    // const isLiked =
                    //   Array.isArray(comment.likes) &&
                    //   comment.likes.includes(user._id);
                    return (
                      <>
                        <div className="mb-4 px-3 border-2 rounded-md font-sans py-2">
                          <p className="font-black mb-1 font-serif text-xs italic">
                            {comment.username}
                          </p>

                          <div className="">
                            <p key={index} className="mb-2">
                              {comment.text}
                            </p>
                          </div>

                          {comment.quotes &&
                            comment.quotes.map((quote, quoteIndex) => (
                              <div
                                key={quoteIndex}
                                className="pl-4 border-l-2 mb-4 mx-auto"
                              >
                                <p className="font-black mb-1 font-serif text-xs italic">
                                  {quote.username}
                                </p>
                                <p>{quote.quote}</p>
                              </div>
                            ))}

                          <div className="flex items-center gap-4 text-2xl">
                            <div className="flex items-center gap-2">
                              <img
                                className="w-4 cursor-pointer"
                                src={
                                  likedComments.includes(comment._id)
                                    ? "/assets/heart.png"
                                    : "/assets/heart1.png"
                                }
                                onClick={async () => {
                                  if (!isAuthenticated) {
                                    alert(
                                      "You need to login to like a comment"
                                    );
                                  } else {
                                    await dispatch(
                                      likeComment({
                                        postId,
                                        commentId: comment._id,
                                      })
                                    )
                                      .then(() => {
                                        // Fetch the updated post data after liking a comment
                                        dispatch(fetchSingle(postId));
                                      })
                                      .then(() => {
                                        // Toggle the like status
                                        toggleLike(comment._id);
                                      });
                                  }
                                }}
                              />

                              <i
                                className="uil uil-comment-dots cursor-pointer text-xl"
                                onClick={() => {
                                  if (quoteBoxCommentId === comment._id) {
                                    setQuoteBoxCommentId(null);
                                  } else {
                                    setQuoteBoxCommentId(comment._id);
                                  }
                                }}
                              ></i>
                              <p className="text-base">
                                {comment.likes.length} likes
                              </p>
                            </div>
                          </div>

                          <div>
                            {quoteBoxCommentId === comment._id && (
                              <div className="flex flex-col relative gap-4">
                                <textarea
                                  className="border-2 outline-none mt-4 p-2 font-sans w-full relative"
                                  type="text"
                                  value={quote}
                                  onChange={(e) => setQuote(e.target.value)}
                                />
                                <button
                                  onClick={() => {
                                    if (quote.trim() !== "") {
                                      dispatch(
                                        quoteComment({
                                          postId,
                                          commentId: comment._id,
                                          quote: quote,
                                        })
                                      );
                                      setQuote("");
                                      setQuoteBoxCommentId(null); // Close the quote box after quoting
                                    }
                                  }}
                                  className="w-1/4 p-2 bg-black text-white font-serif rounded-md"
                                >
                                  Comment
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    );
                    //after checking if the comment has been liked return the length for num of likes
                  })
                )}
              </div>
            </div>

            <Footer />
          </>
        ))}
      </div>
    </>
  );
};
