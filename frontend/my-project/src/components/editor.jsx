import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/post/postSlice";
import { Link, useParams } from "react-router-dom";
import { fetchSingle } from "../features/post/singleSlice";
import { Footer } from "./footer";

export const Editor = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const post = useSelector((state) => state.singlePost);
  // console.log(post);
  const { postId } = useParams();
  // console.log(postId)

  useEffect(() => {
    // Fetch all posts when the component mounts
    dispatch(fetchPosts());
    dispatch(fetchSingle(postId));
  }, []);

  return (
    <>
      <div className="pt-16 relative">
        <div className="flex items-center gap-y-4 flex-col relative">
          <h1 className="font-sans  text-5xl text-center font-bold">
            Editor's pick
          </h1>
          <img src="/assets/Line.png" className="rounded-full " alt="" />
        </div>

        {posts.post.slice(0, 3).map((post) => {
          return (
            <>
              <div className="flex items-center justify-center px-72 py-16 gap-10 relative">
                <div>
                  <img src={post.imgSrc} alt="" />
                </div>
                <div className="w-3/5">
                  <h2 className="text-xl text-lightGray lead  font-sans">
                    {post.tag}
                  </h2>
                  <h1 className="text-3xl font-serif font-bold pb-2">
                    {post.title}
                  </h1>

                  <div className="flex gap-4 items-center pb-2">
                    <p className="text-base text-lightGray font-sans font-normal">
                      {post.author}
                    </p>
                    <img src="/assets/Ellipse1.png" alt="" />
                    <p className="text-base font-sans text-lightGray">
                      {post.createdAt}
                    </p>
                  </div>

                  <p className="text-base pb-2 font-sans font-normal text-[#000]">
                    {post.content}
                  </p>

                  <Link
                    className="font-serif border-solid border-[#00] border-b-2"
                    key={post.postId}
                    to={`/post/${post.postId}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </>
          );
        })}

        <div className="relative px-4 h-96 mb-60">
          <div className="absolute w-[38rem] bg-white right-16 py-20 px-16 z-10">
            <h2 className="text-xl font-sans pb-2 text-lightGray">INTERIOR</h2>
            <h1 className="font-serif text-4xl pb-2 font-bold leading-tight">
              Laborum Ullamco Sunt id ut Sunt
            </h1>
            <div className="flex gap-4 items-center pb-2 font-sans">
              <p className="text-base text-lightGray font-normal">
                Bessie Hawkins
              </p>
              <img src="/assets/Ellipse1.png" alt="" />
              <p className="text-base text-lightGray">
                May 7, 2019 (10 mins read)
              </p>
            </div>
            <p className="text-base font-normal text-[#000]">
              Proident aliquip velit qui commodo officia qui consectetur dolor
              ullamco aliquip elit incididunt. Ea minim ex consectetur
              excepteur. Ex laborum nostrud mollit sint consectetur Lorem amet
              aliqua do enim. Commodo duis dolor anim excepteur. In aliquip
              mollit nulla consequat velit magna.
            </p>
          </div>

          <img src="/assets/articleImage.png" alt="" className="absolute" />
        </div>

        {posts.post.slice(3, 7).map((item, index) => {
          const startIndex = posts.post.length;
          return (
            <div className="relative">
              <div
                key={index + startIndex}
                className="flex relative items-center justify-center px-48 py-16 gap-10"
              >
                <div>
                  <img src={item.imgSrc} alt="" />
                </div>

                <div className="w-full">
                  <h2 className="text-xl text-lightGray lead font-sans">
                    {item.tag}
                  </h2>
                  <h1 className="text-3xl font-serif font-bold pb-2">
                    {item.title}
                  </h1>

                  <div className="flex gap-4 items-center pb-2">
                    <p className="text-base text-lightGray font-sans font-normal">
                      {item.author}
                    </p>
                    <img src="/assets/Ellipse1.png" alt="" />
                    <p className="text-base font-sans text-lightGray">
                      {item.createdAt}
                    </p>
                  </div>

                  <p className="text-base font-sans font-normal text-[#000]">
                    {item.description}
                  </p>

                  <Link
                    className="font-serif border-solid border-[#00] border-b-2"
                    key={item.postId}
                    to={`/post/${item.postId}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>

              <div></div>
            </div>
          );
        })}
      </div>

    </>
  );
};
