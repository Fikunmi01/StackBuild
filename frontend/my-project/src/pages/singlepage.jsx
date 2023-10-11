import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingle } from "../features/post/singleSlice";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";

export const SinglePost = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost);
  const { postId } = useParams();
  useEffect(() => {
    // Fetch the individual post data when the component mounts
    dispatch(fetchSingle(postId));
  }, [postId]);
  // console.log(post);

  return (
    <>
      <div>
        <Navbar/>
        <h1>Hello welcome to post {postId}</h1>
        {console.log(post.singlePost[0])}
        {post.singlePost.map((item, index) => (
            <div key={index}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              {console.log(item.comments)}
              <img src={item.imgSrc} alt="" />
            </div>
          ))}
      </div>
    </>
  );
};
