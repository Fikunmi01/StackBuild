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

  // const day=post.createdAt

  // const day = post.singlePost[0].createdAt.slice(0, 10);
  return (
    <>
      <div>
        
        {post.singlePost.map((item, index) => (
          <>
            <Navbar />

            <div
              key={index}
              className="px-4 w-full items-center flex justify-centerh-1/2 flex-col mb-20"
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
          </>
        ))}
      </div>
    </>
  );
};
