import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingle } from "../features/post/singleSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { postComment } from "../features/post/commentSlice";
import TextEditor from "../components/textEditor";

export const SinglePost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost);
  const { postId } = useParams();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  // const commentArray = useSelector((state) => state.comment);
  const commentArray = Object.values(
    useSelector((state) => state.comment.comment)
  );

  useEffect(() => {
    // Fetch the individual post data when the component mounts
    dispatch(fetchSingle(postId));
    if (postComment === "fulfilled") {
      dispatch(fetchSingle(postId));
    }
  }, [postId, postComment]);

  const handleComment = (comment) => {
    if (comment.trim() !== "") {
      dispatch(postComment({ text: comment, postId }));
      dispatch(fetchSingle(postId));
      setComment("");
    }
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

            {isAuthenticated && (
              <>
                <div className="pt-16 flex flex-col gap-y-4">
                  <TextEditor
                    setComment={setComment}
                    handleComment={handleComment}
                    comment={comment}
                  />
                </div>
              </>
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
                  Object.values(item.comments).map((comment, index) => (
                    <p key={index} className="">
                      {comment.text}
                    </p>
                  ))
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
