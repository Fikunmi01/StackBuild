import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addPost } from "../features/post/postSlice";
import { Navbar } from "./navbar";
import { DemoPage } from "./form";

export const PostForm = () => {
 

  return (
    <>
      <div>
        <Navbar />
    <DemoPage/>

        
        {/* <form className="mx-4 border-dashed border-4" onSubmit={handleSubmit}>
          <div className="flex justify-center border-double py-6 border-b-4">
            <h1 className="font-serif text-3xl font-medium">Create New Post</h1>
          </div>

          <div>
          </div>

          <div className="flex flex-col gap-y-4 px-20 my-10">
            <div className="flex ">
              <label htmlFor="title" className="w-48">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="italic w-96 p-2 border"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex">
              <label className="w-48" htmlFor="content">
                Content
              </label>
              <input
                type="text"
                name="content"
                placeholder="Content"
                className="italic w-96 p-2 border"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex">
              <label htmlFor="image" className="w-48">
                Choose Image
              </label>
              <input
                type="file"
                className="italic w-96 p-2 border"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex">
              <label htmlFor="tag" className="w-48">Select Tag</label>
              <input
                type="text"
                className="italic w-96 p-2 border"
                name="tag"
                placeholder="Tag"
                value={formData.tag}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <TextEditor />

          <button
            type="submit"
            className="postBtn rounded-full border-solid border-2 px-4 py-1 mt-4 text-white font-serif text-base"
          >
            Submit Post
          </button>
        </form> */}
      </div>
    </>
  );
};
