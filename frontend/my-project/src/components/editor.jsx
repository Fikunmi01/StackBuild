import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/post/postSlice";
import { Link, useParams } from "react-router-dom";
import { fetchSingle } from "../features/post/singleSlice";
import { Footer } from "./footer";

export const Editor = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const post = useSelector((state) => state.singlePost);
  const { _id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process form data here
    hideModal(); // Close modal after submission
  };

  useEffect(() => {
    dispatch(fetchPosts());
    // dispatch(fetchSingle(postId));
  }, [dispatch, _id]);

  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  // Updated loading condition to check for both posts and post loading states
  //  const isLoading = posts.loading || post.loading || !posts.post.length || !post.details;

  //  if (isLoading) {
  //    return <div className="w-full h-full flex justify-center items-center"><span class="loader"></span></div>;
  //  }

  const blogArray = [
    {
      id: 1,
      imgSrc: "/assets/blogImg1.jpeg",
      title: "01kvng The New Moneyman",
      description:
        "The world is filled with dangerous technologies which is now integrated ...",
      authImg: "/assets/authImg1.jpeg",
    },
    {
      id: 2,
      imgSrc: "/assets/blogImg2.jpeg",
      title: "01kvng The New Moneyman",
      description:
        "The world is filled with dangerous technologies which is now integrated ...",
      authImg: "/assets/authImg2.jpeg",
    },
    {
      id: 3,
      imgSrc: "/assets/blogImg3.jpeg",
      title: "01kvng The New Moneyman",
      description:
        "The world is filled with dangerous technologies which is now integrated ...",
      authImg: "/assets/authImg3.jpeg",
    },
  ];

  return (
    <div className="pt-12 relative ">
      <div className="px-4">
        <h1 className="font-ser text-2xl font-bold mb-2">Recent Blogs</h1>

        <div className="grid grid-flow-col overflow-x-scroll no-scrollbar auto-cols-max gap-4">
          {blogArray.map((item) => {
            return (
              <div className="flex flex-col gap-y-2" key={item.id}>
                <div className="w-[150px] flex flex-col gap-y-2">
                  <img
                    src={item.imgSrc}
                    alt="blog image"
                    className="h-36 rounded-[20px]"
                  />
                  <h2 className="font-ser w-full font-bold text-[11px] leading-3">
                    {item.title.slice(0, 20)}...
                  </h2>
                  <p className="font-pop w-full text-[10px]">
                    {item.description.slice(0, 50)}...
                  </p>

                  <div className="flex gap-x-2 items-center">
                    <img
                      src={item.authImg}
                      className="w-5 h-5 rounded-full"
                      alt=""
                    />
                    <p className="font-pop text-[10px] font-normal">
                      SkullCrusher
                    </p>
                    <p className="text-[8px]">10 Jan 2024</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex px-4 gap-y-4 mt-4 flex-col relative ">
        <h1 className="font-ser text-2xl md:text-2xl font-bold">
          Editor's pick
        </h1>
      </div>
      {posts.post.length > 0 && (
        <div className="px-4 flex items-center gap-x-2">
          <img
            src="/assets/editor1.jpeg"
            alt=""
            className="w-44 h-44 rounded-2xl"
          />
          <div className="my-4 flex flex-col">
            <h1 className="font-ser text-xl">
              {posts.post[0].title.slice(0, 20)}...
            </h1>
            <p className="font-pop text-sm mb-1">
              {posts.post[0].content.slice(0, 40)}...
            </p>

            <Link
              to={`/post/${posts.post[0]._id}`}
              className="font-pop text-xs mb-2 text-[#1D1B20] underline"
            >
              Read More
            </Link>

            <div className="flex gap-x-2 items-center">
              <img
                src="/assets/authImg1.jpeg"
                className="w-5 h-5 rounded-full"
                alt=""
              />
              <p className="font-pop text-[10px] font-normal">
                {posts.post[0].author}
              </p>
              <p className="text-[8px]">
                {posts.post[0].createdAt.slice(0, 10)}
              </p>
            </div>

            <div className="flex gap-4 text-[#1D1B20] text-[10px] font-pop justify-center">
              <p>5 Views</p>
              <p>{posts.post[0].comments.length} Comments</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2">
        {posts.post.slice(1, 5).map((post, index) => (
          <div
            className="flex flex-col px-4 md:flex-row md:items-center md:justify-center md:px-72 md:py-16 md:gap-10 relative md:mb-0"
            key={post._id}
          >
            <div className="my-4">
              <div className="px-4 flex flex-row items-center gap-2">
                <img
                  src={`/assets/postImg${index + 1}.jpeg`}
                  className="w-10 h-10 rounded-xl"
                  alt=""
                />
                <div className="flex flex-col gap-y-2">
                  <Link to={`/post/${post._id}`}>
                    <h3 className="text-[11px] font-ser font-bold">
                      {post.title.slice(0, 22)}...
                    </h3>
                  </Link>
                  <p className="text-[10px] font-normal font-ser">
                    By {getFirstName(post.author)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 my-">
        <h1 className="font-ser text-2xl font-bold">Trending</h1>
      </div>

      <div className="px-4 flex gap-x-2 items-center mb-4">
        <img
          src="/assets/trend1.jpeg"
          className="w-20 h-20 rounded-2xl"
          alt=""
        />
        <div>
          <div className="flex justify-between mt-1">
            <p className="text-[10px] font-pop border-solid border border-[#00000033] px-2 rounded-full ">
              Hot
            </p>
            <p className="font-pop text-[10px]">Published 2hrs ago</p>
          </div>

          <div>
            <h2 className="text-[11px] font-bold mt-2 font-ser">
              01kvng The New Moneyman
            </h2>
            <p className="font-pop text-[10px] mb-2">
              He spends like there is no tomorrow. The odogwu in town....
            </p>
            <div className="flex justify-between">
              <p className="text-[8px] font-normal">By SkullCrusher</p>
              <p className="text-[9px]">5 Views</p>
            </div>
          </div>
        </div>
      </div>

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

      {posts.post &&
        posts.post.length > 3 &&
        posts.post.slice(3, 7).map((item, index) => {
          const startIndex = posts.post.length;
          return (
            <div
              key={index + startIndex}
              className="relative px-4 md:px-0 mt-4 md:mt-0"
            >
              <div className="flex relative flex-col md:flex-row md:items-center md:justify-center md:px-48 md:py-16 md:gap-10 mb-10">
                <div>
                  <img src={item.imgSrc} alt="" className="w-full" />
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
                      {item.createdAt.slice(0, 10)}
                    </p>
                  </div>

                  <p className="text-base font-sans font-normal text-[#000]">
                    {item.description}
                  </p>

                  <Link
                    className="font-serif border-solid border-[#00] border-b-2"
                    to={`/post/${item._id}`}
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

// <button onClick={showModal} className=" border-solid border-2 px-4 py-2">
// Create Post
// </button>
// {isModalOpen && (
// <div className="modal bg-red-900">
//   <div className="modal-content">
//     <span className="close" onClick={hideModal}>
//       &times;
//     </span>
//     <form onSubmit={handleSubmit}>
//       <label>
//         Title:
//         {/*  */} <input type="text" name="title" />
//       </label>
//       <label>
//         Content:
//         <textarea name="content" />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// </div>
// )}
