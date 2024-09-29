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
  const { _id } = useParams();
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
    dispatch(fetchSingle(_id));
    if (postComment.fulfilled) {
      dispatch(fetchSingle(_id));
    }
  }, [_id]);

  useEffect(() => {
    // update the nnumber of likes

    dispatch(fetchSingle(_id));
    dispatch(fetchSingle(comment._id));
  }, [comment.likes]);

  useEffect(() => {
    // Re-render the component when the post.singlePost object changes
  }, [post.singlePost]);

  const handleComment = (comment) => {
    if (comment.trim() !== "") {
      dispatch(postComment({ text: comment, _id }));
      setComment("");
    }
  };

  const toggleQuoteBox = () => {
    setQuoteBox(!quoteBox);
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <div className="">
        {post.singlePost.map((item) => (
          <>
            <div key={item._id}>
              <div className="relative">
                <div className="absolute w-full">
                  <Navbar />
                </div>

                <img src="/assets/blogImg2.jpeg" alt="" />
              </div>

              <div className="absolute top-60 py-4 w-full rounded-t-3xl bg-white">
                <div className="px-4">
                  <p className="font-pop font-normal text-[15px] bg-[#F5F5F5] mb-2 text-[#1E1E1E] px-2 py-1 w-20 rounded-lg">
                    Recents
                  </p>

                  <h1 className="text-2xl font-ser mb-2 font-bold">
                    {item.title}
                  </h1>

                  <div className="flex items-center gap-2 mb-4">
                    <img
                      src="/assets/imgAvatar.jpeg"
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div className="flex gap-y-1 flex-col">
                      <p className="font-ser">{item.author}</p>
                      <div className="flex items-center text-[#8E8D8F] font-pop gap-x-2">
                        <p>{item.createdAt.slice(0, 10)}</p>
                        <img src="/assets/Ellipse 7.png" alt="" />
                        <p>10 mins read</p>
                        <img src="/assets/Ellipse 7.png" alt="" />
                        <p>55 views</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg font-normal mb-4 font-pop">
                  {item.content}
                  </p>

                  <div className="flex items-center gap-x-4 mb-2">
                    <span className="flex items-center gap-x-2">
                      <img
                        src="/assets/Icon.png"
                        // onClick={async () => {
                        //   await dispatch(
                        //     likeComment({
                        //       _id,
                        //       commentId: comment._id,
                        //     })
                        //   );
                        // }}
                        alt=""
                      />
                      <p className="text-[#8E8D8F] text-xs font-normal">115</p>
                    </span>

                    <span className="flex items-center gap-x-2">
                      <img
                        className=" rotate-90"
                        src="/assets/Icon.png"
                        alt=""
                      />
                      <p className="text-[#8E8D8F] font-normal text-xs">10</p>
                    </span>

                    <span className="flex items-center gap-x-2">
                      <img className="" src="/assets/icon1.png" alt="" />
                      <p className="text-[#8E8D8F] font-normal text-xs">
                        {item.comments.length} Comment
                      </p>
                    </span>
                  </div>
                </div>

                <div>
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
                    <p className="md:mx-80 md:relative m-auto p-4 italic font-semibold text-red-500">
                      You need to{" "}
                      <Link to="/user/login" className="underline">
                        login
                      </Link>{" "}
                      before you can comment
                    </p>
                  )}
                  <div className="md:mx-80 relative m-auto px-4 flex flex-col gap-20 py-16">
                    <div>
                      <h1 className="font-serif text-2xl">Comments</h1>

                      {!Object.keys(item.comments).length > 0 ? (
                        <div className="font-sans">
                          <p className="italic font-semibold">
                            There's no comment available
                          </p>
                          <p className="italic font-semibold">
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
                          return (
                            <>
                              <div
                                className="mb-4 px-3 border-2 rounded-md font-sans py-2"
                                key={comment._id}
                              >
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
                                              _id,
                                              commentId: comment._id,
                                            })
                                          )
                                            .then(() => {
                                              dispatch(fetchSingle(_id));
                                            })
                                            .then(() => {
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
                                        onChange={(e) =>
                                          setQuote(e.target.value)
                                        }
                                      />
                                      <button
                                        onClick={() => {
                                          if (quote.trim() !== "") {
                                            dispatch(
                                              quoteComment({
                                                _id,
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
                </div>
                <Footer />
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
