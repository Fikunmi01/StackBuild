import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingle } from "../features/post/singleSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { postComment } from "../features/post/commentSlice";

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
  }, [postId]);

  const handleComment = (e) => {
    e.preventDefault();

    if (comment.trim() !== "") {
      dispatch(postComment({ text: comment, postId }));
      dispatch(fetchSingle(postId));
      setComment("");
    }
  };

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // if (commentArray.length === 0) {
  //   return <p>Theres's no comment available</p>;
  // }
  return (
    <>
      <div>
        {post.singlePost.map((item, index) => (
          <>
            <Navbar />

            <div
              key={index}
              className="px-4 w-full items-center flex justify-centerh-1/2 flex-col "
            >
              {/* {console.log(item.comments)} */}
              <img src={item.imgSrc} alt="" className="w-[100vh] mb-10" />
              <h2 className="font-serif text-3xl w-2/4 text-center leading-normal mx-auto font-bold">
                {item.title}
              </h2>
              <span className="flex text-lightGray text-xl gap-4 items-center mb-4">
                <p>{item.author}</p>
                <img src="/assets/Ellipse1.png" alt="" />
                {/* <p>{day}</p> */}
              </span>

              <p className="text-lightGray mb-4 font-sans">
                #technology #tech #career
              </p>

              <p className="px-80  font-sans leading-normal">{item.content}</p>
            </div>

            {isAuthenticated && (
              <div>
                <label htmlFor="comment">Enter comment</label>
                <input
                  type="text"
                  name=""
                  onChange={(e) => setComment(e.target.value)}
                  id=""
                  className="border-2"
                />
                <button type="submit" onClick={handleComment}>
                  submit
                </button>
              </div>
            )}

            {item.comments && item.comments.length > 0 ? (
              item.comments.map((comment, index) => (
                <p key={index}>{comment.text}</p>
              ))
            ) : (
              <p>There's no comment available</p>
            )}

            <Footer />
          </>
        ))}
      </div>
    </>
  );
};
