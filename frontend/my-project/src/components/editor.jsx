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
  const { postId } = useParams();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchSingle(postId));
  }, [dispatch, postId]);

 // Updated loading condition to check for both posts and post loading states
//  const isLoading = posts.loading || post.loading || !posts.post.length || !post.details;

//  if (isLoading) {
//    return <div className="w-full h-full flex justify-center items-center"><span class="loader"></span></div>;
//  }

  return (
    <div className="pt-16 relative">
      <div className="flex items-center gap-y-4 flex-col relative ">
        <h1 className="font-sans text-3xl md:text-5xl text-center font-bold">
          Editor's pick
        </h1>
        <img
          src="/assets/Line.png"
          className="rounded-full mb-4 md:mb-0"
          alt=""
        />
      </div>

      {posts.post.slice(0, 3).map((post) => (
        <div
          className="flex flex-col-reverse px-4 md:flex-row md:items-center md:justify-center md:px-72 md:py-16 md:gap-10 relative mb-10 md:mb-0"
          key={post.postId}
        >
          <div className="mt-10 md:mt-0">
            <img src={post.imgSrc} alt="" />
          </div>
          <div className="md:w-3/5">
            <h2 className="text-lg md:text-xl text-lightGray lead font-sans">
              {post.tag}
            </h2>
            <h1 className="text-2xl md:text-3xl font-serif font-bold pb-2">
              {post.title}
            </h1>

            <div className="flex flex-row gap-2 md:gap-4 items-center pb-2">
              <p className="text-base text-lightGray font-sans font-normal">
                {post.author}
              </p>
              <img src="/assets/Ellipse1.png" alt="" />
              <p className="text-base font-sans text-lightGray">
                {post.createdAt.slice(0, 10)}
              </p>
            </div>

            <p className="text-base pb-2 font-sans font-normal text-[#000]">
              {post.content}
            </p>

            <Link
              className="font-serif border-solid border-[#00] border-b-2"
              to={`/post/${post.postId}`}
            >
              Read more
            </Link>
          </div>
        </div>
      ))}

      <div className="relative px-4 md:h-96 mb-20">
        <div className="md:absolute md:w-[38rem] bg-white md:right-16 md:py-20 md:px-16 z-10">
          <h2 className="text-xl font-sans pb-2 text-lightGray">INTERIOR</h2>
          <h1 className="font-serif md:w-full text-xl md:text-4xl pb-2 font-bold leading-tight">
            Laborum Ullamco Sunt id ut Sunt
          </h1>
          <div className="md:flex gap-4 items-center pb-2 font-sans">
            <p className="text-base text-lightGray font-normal">
              Bessie Hawkins
            </p>
            <img
              src="/assets/Ellipse1.png"
              className="hidden md:block"
              alt=""
            />
            <p className="text-base text-lightGray">
              May 7, 2019 (10 mins read)
            </p>
          </div>
          <p className="text-base font-normal text-[#000]">
            Proident aliquip velit qui commodo officia qui consectetur dolor
            ullamco aliquip elit incididunt. Ea minim ex consectetur excepteur.
            Ex laborum nostrud mollit sint consectetur Lorem amet aliqua do
            enim. Commodo duis dolor anim excepteur. In aliquip mollit nulla
            consequat velit magna.
          </p>
        </div>

        <img
          src="/assets/articleImage.png"
          alt=""
          className="md:absolute h-60 md:h-full mt-4 md:mb-0"
        />
      </div>

      {posts.post.slice(3, 7).map((item, index) => {
        const startIndex = posts.post.length;
        return (
          <div
            key={index + startIndex}
            className="relative px-4 md:px-0 mt-4 md:mt-0"
          >
            <div className="flex relative flex-col md:flex-row md:items-center md:justify-center md:px-48 md:py-16 md:gap-10 mb-10">
              <div>
                <img src={item.imgSrc} alt="" className="w-full"/>
              </div>

              <div className="w-full">
                <h2 className="text-lg md:text-xl text-lightGray lead font-sans">
                  {item.tag}
                </h2>
                <h1 className="text-2xl md:text-3xl font-serif font-bold pb-2">
                  {item.title}
                </h1>

                <div className="flex gap-2 md:gap-4 items-center pb-2">
                  <p className="text-base text-lightGray font-sans font-normal">
                    {item.author}
                  </p>
                  <img src="/assets/Ellipse1.png" alt="" />
                  <p className="text-base font-sans text-lightGray">
                    {item.createdAt.slice(0,10)}
                  </p>
                </div>

                <p className="text-base font-sans font-normal text-[#000]">
                  {item.description}
                </p>

                <Link
                  className="font-serif border-solid border-[#00] border-b-2"
                  to={`/post/${item.postId}`}
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};